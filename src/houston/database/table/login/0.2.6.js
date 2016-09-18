/**
 * houston/database/table/login/0.2.6.js
 * Creates the login table for version 0.2.6
 *
 * @exports {Function} up - Creates a new database login table
 * @exports {Function} down - Drops the current database login table
 */

/**
 * up
 * Creates a new database login table
 *
 * @param {Object} knex - an initalized knex object
 * @return {Void}
 */
export function up (knex) {
  knex.schema.createTable('logins', (table) => {
    table.increments('key')

    table.string('user_key').references('users.key')

    table.string('service_name')
    table.string('service_id')
    table.string('service_access')
    table.string('service_refresh')

    table.timestamp('time_created').defaultTo(knex.fn.now())
    table.timestamp('time_updated')
    table.timestamp('time_used')
  })
}

/**
 * down
 * Drops the current database login table
 *
 * @param {Object} knex - an initalized knex object
 * @return {Void}
 */
export function down (knex) {
  return knex.schema.dropTable('logins')
}
