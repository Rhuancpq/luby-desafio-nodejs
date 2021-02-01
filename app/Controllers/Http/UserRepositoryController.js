"use strict";

const User = require("../../Models/User");

class UserRepositoryController {
  /**
   * Display a single user repositories.
   * GET users/:id/repositories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params, request, response, view }) {
    try {
      const user = await User.findOrFail(params.id);

      response.json(await user.repositories().fetch());
    } catch (ModelNotFoundException) {
      response.notFound("User not Found");
    }
  }
}

module.exports = UserRepositoryController;
