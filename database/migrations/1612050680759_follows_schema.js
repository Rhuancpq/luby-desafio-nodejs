"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FollowSchema extends Schema {
  up() {
    this.create("follows", (table) => {
      table.increments();
      table
        .integer("followed_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users");
      table
        .integer("following_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users");
      table.timestamps();
    });
  }

  down() {
    this.drop("follows");
  }
}

module.exports = FollowSchema;
