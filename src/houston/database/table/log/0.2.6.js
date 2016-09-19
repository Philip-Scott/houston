/**
 * houston/database/table/log/0.2.6.js
 * Creates the log table for version 0.2.6
 *
 * @exports {Function} up - Creates a new database log table
 * @exports {Function} down - Drops the current database log table
 */

/**
 * up
 * Creates a new database log table
 *
 * @param {Object} knex - an initalized knex object
 * @return {Void}
 */
export function up (knex) {
  return knex.schema.createTableIfNotExists('logs', (table) => {
    table.increments('id')

    table.integer('cycle_id').unsigned().references('id').inTable('cycles').onDelete('CASCADE')

    table.string('service_id')

    table.string('title').notNullable()
    table.text('body')

    table.timestamp('time_created').defaultTo(knex.fn.now())
    table.timestamp('time_published')
  })
}

/**
 * down
 * Drops the current database log table
 *
 * @param {Object} knex - an initalized knex object
 * @return {Void}
 */
export function down (knex) {
  return knex.schema.dropTableIfExists('logs')
}
