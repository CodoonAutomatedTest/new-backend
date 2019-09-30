'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HelperSchema extends Schema {
  up () {
    this.create('helpers', (table) => {
      table.increments()
      table.string('to_user', 64).notNullable()
      table.string('from_user', 64).notNullable()
      table.string('date', 24).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('helpers')
  }
}

module.exports = HelperSchema
