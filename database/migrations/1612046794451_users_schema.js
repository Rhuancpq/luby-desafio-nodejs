"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsersSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("nome").notNullable();
      table.string("email").notNullable().unique();
      table.string("cidade").notNullable();
      table.string("estado", 2).notNullable();
      table.string("username").notNullable().unique();
      table.text("bio", ["longtext"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UsersSchema;
