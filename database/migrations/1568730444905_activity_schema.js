'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActivitySchema extends Schema {
  up () {
    this.create('activities', (table) => {
      table.increments()
      table.string('shop', 32).notNullable()
      table.string('title', 64).notNullable()
      table.string('avatar', 64).notNullable()
      table.string('href', 64).notNullable()
      table.string('status', 10).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('activities')
  }
}

module.exports = ActivitySchema
