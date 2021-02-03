"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class User extends Model {
  stars() {
    return this.belongsToMany("App/Models/Repository").pivotModel(
      "App/Models/Star"
    );
  }

  followers() {
    return this.hasMany("App/Models/Follow", "id", "followed_id");
  }

  followings() {
    return this.hasMany("App/Models/Follow", "id", "following_id");
  }

  repositories() {
    return this.hasMany("App/Models/Repository");
  }

  tokens() {
    return this.hasMany("App/Models/Token");
  }
}

module.exports = User;
