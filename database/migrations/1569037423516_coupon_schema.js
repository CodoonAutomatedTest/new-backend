'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CouponSchema extends Schema {
  up () {
    this.create('coupons', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 64).notNullable()
      table.string('avatar', 128)
      table.string('head', 128)
      table.string('number', 24).notNullable()
      table.string('deadline', 32).notNullable()
      table.integer('status').defaultTo(0).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('coupons')
  }
}

module.exports = CouponSchema
