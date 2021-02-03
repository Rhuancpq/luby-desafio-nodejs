"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Repository = require("../../Models/Repository");
const User = require("../../Models/User");
const Star = require("../../Models/Star");

/**
 * Resourceful controller for interacting with stars
 */
class StarController {
  /**
   * Show a list of all stars.
   * GET stars
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      response.json(await Star.all());
    } catch (ModelNotFoundException) {
      response.notFound("Star relation not found");
    }
  }

  /**
   * Create/save a new star.
   * POST stars
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.all();
    const star = new Star();
    let user;
    let repo;
    try {
      user = await User.findOrFail(data.user_id);
    } catch (ModelNotFoundException) {
      return response.notFound("User not found");
    }

    try {
      repo = await Repository.findOrFail(data.repository_id);
    } catch (ModelNotFoundException) {
      return response.notFound("Repository not found");
    }

    star.user_id = user.id;
    star.repository_id = repo.id;

    star.save();

    response.accepted();
  }

  /**
   * Display a single star.
   * GET stars/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      response.json(await Star.findOrFail(params.id));
    } catch (ModelNotFoundException) {
      response.notFound("Star relation not found");
    }
  }

  /**
   * Delete a star with id.
   * DELETE stars/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const star = await Star.findOrFail(params.id);

      await star.delete();

      response.accepted();
    } catch (ModelNotFoundException) {
      response.notFound("Star relation not found");
    }
  }
}

module.exports = StarController;
