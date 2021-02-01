"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = require("../../Models/User");
const Follow = require("../../Models/User");

/**
 * Resourceful controller for interacting with follows
 */
class FollowController {
  /**
   * Show a list of all follows.
   * GET follows
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    response.json(await Follow.all());
  }

  /**
   * Create/save a new follow.
   * POST follows
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const follow = new Follow();
    const data = request.all();
    let followed, following;
    try {
      followed = await User.findOrFail(data.followed_id);
      following = await User.findOrFail(data.following_id);
    } catch (ModelNotFoundException) {
      response.notFound("User not found");
    }

    follow.followed_id = followed.id;
    follow.following_id = following.id;

    await follow.save();
  }

  /**
   * Display a single follow.
   * GET follows/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      response.json(await Follow.findOrFail(params.id));
    } catch (ModelNotFoundException) {
      response.notFound("Follow not found");
    }
  }

  /**
   * Display a single follow's followed.
   * GET follows/:id/followed
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showFollowed({ params, request, response, view }) {
    try {
      const follow = await Follow.findOrFail(params.id);
      response.json(await follow.followed().fetch());
    } catch (ModelNotFoundException) {
      response.notFound("Follow not found");
    }
  }

  /**
   * Display a single follow's following.
   * GET follows/:id/following
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showFollowing({ params, request, response, view }) {
    try {
      const follow = await Follow.findOrFail(params.id);
      response.json(await follow.following().fetch());
    } catch (ModelNotFoundException) {
      response.notFound("Follow not found");
    }
  }

  /**
   * Delete a follow with id.
   * DELETE follows/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const follow = await Follow.findOrFail(params.id);

      await follow.delete();
    } catch (ModelNotFoundException) {
      response.notFound("Follow not found");
    }
  }
}

module.exports = FollowController;
