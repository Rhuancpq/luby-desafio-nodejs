"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Follow extends Model {
  follower() {
    return this.belongsTo("App/Models/User");
  }

  following() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Follow;
