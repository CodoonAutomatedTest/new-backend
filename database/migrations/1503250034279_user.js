'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('user_id', 128).notNullable().unique()
      table.string('card_id', 64).unique()
      table.string('openid', 64).notNullable().unique()
      table.string('password', 64).notNullable()
      table.string('nickName', 64)
      table.string('avatarUrl', 256)
      table.integer('gender')
      table.string('city', 64)
      table.string('phone', 64).unique()
      table.integer('score').defaultTo(0).notNullable()
      table.integer('type').defaultTo(0).notNullable()
      table.string('last_login').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
