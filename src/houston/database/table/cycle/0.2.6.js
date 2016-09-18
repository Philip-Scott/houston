/**
 * houston/database/table/cycle/0.2.6.js
 * Creates the cycle table for version 0.2.6
 *
 * @exports {Function} up - Creates a new database cycle table
 * @exports {Function} down - Drops the current database cycle table
 */

/**
 * up
 * Creates a new database cycle table
 *
 * @param {Object} knex - an initalized knex object
 * @return {Void}
 */
export function up (knex) {
  return knex.schema.createTable('cycles', (table) => {
    table.increments('key')

    table.string('repo')
    table.string('tag')
    table.string('version')
    table.enum('status', ['QUEUE', 'RUN', 'REVIEW', 'FINISH', 'FAIL', 'ERROR'])
    table.enum('type', ['release'])

    table.timestamp('time_created').defaultTo(knex.fn.now())
    table.timestamp('time_ran')
    table.timestamp('time_finished')
  })
}

/**
 * down
 * Drops the current database cycle table
 *
 * @param {Object} knex - an initalized knex object
 * @return {Void}
 */
export function down (knex) {
  return knex.schema.dropTable('cycles')
}
