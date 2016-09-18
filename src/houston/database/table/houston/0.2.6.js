/**
 * houston/database/table/houston/0.2.6.js
 * Creates the houston table for version 0.2.6
 *
 * @exports {Function} up - Creates a new database houston table
 * @exports {Function} down - Drops the current database houston table
 */

/**
 * up
 * Creates a new database houston table
 *
 * @param {Object} knex - an initalized knex object
 * @return {Promise} - a promise of completion
 */
export function up (knex) {
  return knex.schema.createTableIfNotExists('houston', (table) => {
    table.increments('key')

    table.string('table_to')
    table.string('table_from')

    table.timestamp('time_created').defaultTo(knex.fn.now())
  })
}

/**
 * down
 * Does nothing because this table in important :/
 *
 * @param {Object} knex - an initalized knex object
 * @return {Promise} - a promise of completion
 */
export function down (knex) {
  return new Promise((resolve, reject) => resolve())
}
