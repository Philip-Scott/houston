/**
 * houston/database/table/user/0.2.6.js
 * Creates the user table for version 0.2.6
 *
 * @exports {Function} up - Creates a new database user table
 * @exports {Function} down - Drops the current database user table
 */

/**
 * up
 * Creates a new database user table
 *
 * @param {Object} knex - an initalized knex object
 * @return {Promise} - a promise of completion
 */
export function up (knex) {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('id')

    table.string('username', 64).notNullable().unique().index()
    table.string('email').notNullable()
    table.string('avatar')

    table.boolean('right_review').defaultTo(false)
    table.boolean('right_admin').defaultTo(false)

    table.timestamp('time_created').defaultTo(knex.fn.now())
    table.timestamp('time_updated')
    table.timestamp('time_used')
  })
}

/**
 * down
 * Drops the current database user table
 *
 * @param {Object} knex - an initalized knex object
 * @return {Promise} - a promise of completion
 */
export function down (knex) {
  return knex.schema.dropTableIfExists('users')
}
