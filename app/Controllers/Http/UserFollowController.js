"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = require("../../Models/User");
const Follow = require("../../Models/Follow");

/**
 * Resourceful controller for interacting with userfollows
 */
class UserFollowController {
  /**
   * Show a list of all user's followers.
   * GET user/:id/followers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async indexFollowers({ params, request, response, view }) {
    try {
      const user = await User.findOrFail(params.id);
      response.json(await user.followers().fetch());
    } catch (ModelNotFoundException) {
      response.notFound("UserNotFound");
    }
  }

  /**
   * Show a list of all user's followings.
   * GET user/:id/followings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async indexFollowings({ params, request, response, view }) {
    try {
      const user = await User.findOrFail(params.id);
      response.json(await user.followings().fetch());
    } catch (ModelNotFoundException) {
      response.notFound("UsersNotFound");
    }
  }

  /**
   * Create/save a new following.
   * Make the user follows other user
   * POST users/:id/follow
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request, response }) {
    try {
      const user = await User.findOrFail(params.id);
      const follow = new Follow();
      data = request.all();

      follow.followed_id = data.followed_id;
      follow.following_id = user.id;

      await follow.save();
    } catch (ModelNotFoundException) {
      response.notFound("UserNotFound");
    }
  }
}

module.exports = UserFollowController;
