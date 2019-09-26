'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CollectionSchema extends Schema {
  up () {
    this.create('collections', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('feed_id').notNullable()
      table.string('type').notNullable()
      table.string('avatar', 64).notNullable()
      table.string('desc', 256).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('collections')
  }
}

module.exports = CollectionSchema
