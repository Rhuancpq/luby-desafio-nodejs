"use strict";

const { findOrFail } = require("../../Models/Repository");
const Repository = require("../../Models/Repository");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with repositories
 */
class RepositoryController {
  /**
   * Show a list of all repositories.
   * GET repositories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    response.json(await Repository.all());
    response.accepted();
  }

  /**
   * Create/save a new repository.
   * POST repositories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const repo = new Repository();
    const data = request.all();
    let user;
    try {
      user = await User.findOrFail(data.user_id);
    } catch (ModelNotFoundException) {
      response.notFound("User not found");
    }

    repo.nome = data.nome;
    repo.description = data.description;
    repo.publice = data.public;
    repo.slug = user.nome + data.nome;
    repo.user_id = user.id;

    await repo.save();
  }

  /**
   * Display a single repository.
   * GET repositories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      response.json(await Repository.findOrFail(params.id));
    } catch (ModelNotFoundException) {
      response.notFound("Repository not found");
    }
  }

  /**
   * Update repository details.
   * PUT or PATCH repositories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const repo = await Repository.findOrFail(params.id);
      const data = request.all();

      repo.nome = data.nome;
      repo.description = data.description;
      repo.publice = data.public;
      repo.slug = data.slug;
      repo.user_id = data.user_id;

      await repo.save();
    } catch (ModelNotFoundException) {
      response.notFound("Repository not found");
    }
  }

  /**
   * Delete a repository with id.
   * DELETE repositories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const repo = await Repository.findOrFail(params.id);

      await repo.delete();
    } catch (ModelNotFoundException) {
      response.notFound("Repository not found");
    }
  }
}

module.exports = RepositoryController;
