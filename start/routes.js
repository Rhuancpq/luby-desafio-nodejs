"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.resource("users", "UserController").apiOnly();
  Route.get("users/:id/repositories", "UserRepositoryController.index");
  Route.get("users/:id/followeds", "UserFollowController.indexFollowers");
  Route.get("users/:id/followings", "UserFollowController.indexFollowings");
  Route.get("users/:id/follow", "UserFollowController.store");

  Route.resource("repositories", "RepositoryController").apiOnly();

  Route.resource("follows", "FollowController").apiOnly().except(["update"]);
  Route.get("follows/:id/followed", "FollowController.showFollowed");
  Route.get("follows/:id/following", "FollowController.showFollowing");

  Route.resource("stars", "StarController").apiOnly().except(["update"]);

  Route.post("auth/sign-in", "AuthController.signIn");
}).prefix("api/vi");
