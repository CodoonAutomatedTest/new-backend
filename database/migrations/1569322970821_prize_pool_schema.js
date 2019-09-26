'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PrizePoolSchema extends Schema {
  up () {
    this.create('prize_pools', (table) => {
      table.increments()
      table.integer('code').notNullable().unique()
      table.string('name', 64).notNullable()
      // table.string('head', 256).notNullable()
      table.string('avatar', 256).notNullable()
      table.integer('prob').notNullable().defaultTo(0)
      table.integer('num').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('prize_pools')
  }
}

module.exports = PrizePoolSchema
