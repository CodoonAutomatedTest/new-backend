'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleSchema extends Schema {
  up () {
    this.create('articles', (table) => {
      table.increments()
      table.string('shop', 32).notNullable()
      table.string('title', 64).notNullable()
      table.string('avatar', 128).notNullable()
      table.string('description', 256).notNullable()
      table.string('href', 128).notNullable()
      table.string('time', 64).notNullable()
      table.integer('rate').notNullable()
      table.integer('status').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('articles')
  }
}

module.exports = ArticleSchema
