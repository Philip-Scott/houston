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
  return knex.schema.createTableIfNotExists('logins', (table) => {
    table.increments('id')

    table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')

    table.string('service_name').notNullable()
    table.string('service_id').notNullable()
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
  return knex.schema.dropTableIfExists('logins')
}
