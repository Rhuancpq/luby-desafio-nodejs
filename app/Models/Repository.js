"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Repository extends Model {
  getStars(stars) {
    return stars;
  }

  stars() {
    return this.belongsToMany("App/Models/User").pivotModel("App/Models/Star");
  }

  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Repository;
