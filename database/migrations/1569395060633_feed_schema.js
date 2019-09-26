'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FeedSchema extends Schema {
  up () {
    this.create('feeds', (table) => {
      table.increments()
      table.string('type', 32).notNullable()
      table.string('avatar').notNullable()
      table.integer('like').notNullable().defaultTo(100)
      table.string('description', 256)
      table.timestamps()
    })
  }

  down () {
    this.drop('feeds')
  }
}

module.exports = FeedSchema
