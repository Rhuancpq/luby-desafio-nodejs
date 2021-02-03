"use strict";

const User = require("../../Models/User");
const { validate } = use("Validator");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    response.json(await User.all());
    response.accepted();
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const user = new User();

    const data = request.all();

    const rules = {
      email: "required|email|unique:users,email",
      username: "required|unique:users,username",
      password: "required|min:8|max:60",
      nome: "required",
      cidade: "required",
      estado: "required|min:2|max:2",
    };

    const validation = await validate(data, rules);

    if (validation.fails()) {
      return response.unauthorized(validation.messages());
    }

    user.nome = data.nome;
    user.email = data.email;
    user.cidade = data.cidade;
    user.estado = data.estado;
    user.username = data.username;
    user.bio = data.bio;
    user.password = data.password;

    await user.save();

    response.accepted();
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      response.json(await User.findOrFail(params.id));
    } catch (ModelNotFoundException) {
      response.notFound("User not Found");
    }
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const user = await User.findOrFail(params.id);

      const data = request.all();

      user.nome = data.nome;
      user.email = data.email;
      user.cidade = data.cidade;
      user.estado = data.estado;
      user.username = data.username;
      user.password = data.password;
      user.bio = data.bio;

      await user.save();

      response.accepted("User updated");
    } catch (ModelNotFoundException) {
      response.notFound("User not Found");
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const user = await User.findOrFail(params.id);
      await user.delete();
    } catch (ModelNotFoundException) {
      response.notFound("User not Found");
    }
  }
}

module.exports = UserController;
