'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WheelUserSchema extends Schema {
  up () {
    this.create('wheel_users', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('openid', 64).notNullable().unique()
      table.string('nickName', 64)
      table.string('avatarUrl', 256)
      table.integer('count').notNullable().defaultTo(2)
      table.string('last_login').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('wheel_users')
  }
}

module.exports = WheelUserSchema
