"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RepositoriesSchema extends Schema {
  up() {
    this.create("repositories", (table) => {
      table.increments();
      table.string("nome").notNullable();
      table.string("description").notNullable();
      table.boolean("public").notNullable().defaultTo(true);
      table.string("slug").notNullable();
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users");
      table.timestamps();
    });
  }

  down() {
    this.drop("repositories");
  }
}

module.exports = RepositoriesSchema;
