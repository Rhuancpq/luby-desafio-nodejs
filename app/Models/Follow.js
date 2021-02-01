"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Follow extends Model {
  followed() {
    return this.belongsTo("App/Models/User", "followed_id");
  }

  following() {
    return this.belongsTo("App/Models/User", "following_id");
  }
}

module.exports = Follow;
