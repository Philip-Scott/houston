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
  return knex.schema.createTable('users', (table) => {
    table.increments('key')

    table.string('username', 64)
    table.string('email')
    table.string('avatar')

    table.enum('right', ['USER', 'BETA', 'REVIEW', 'ADMIN'])

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
  return knex.schema.dropTable('users')
}
