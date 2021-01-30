"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class User extends Model {
  stars() {
    return this.belongsToMany("App/Models/Repository");
  }

  followers() {
    return this.hasMany("App/Models/Follow", "id", "follower_id");
  }

  following() {
    return this.hasMany("App/Models/Follow", "id", "following_id");
  }
}

module.exports = User;
