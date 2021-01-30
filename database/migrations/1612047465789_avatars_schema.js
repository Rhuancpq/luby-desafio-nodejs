'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AvatarsSchema extends Schema {
  up () {
    this.create('avatars', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('avatars')
  }
}

module.exports = AvatarsSchema
