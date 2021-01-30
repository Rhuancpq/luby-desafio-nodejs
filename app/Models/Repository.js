"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Repository extends Model {
  stars() {
    return this.belongsToMany("App/Models/User");
  }
}

module.exports = Repository;
