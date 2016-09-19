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
  return knex.schema.createTableIfNotExists('cycles', (table) => {
    table.increments('key')

    table.integer('project_key').notNullable().unsigned().references('key').inTable('projects').onDelete('CASCADE')
    table.integer('release_key').unsigned().references('key').inTable('releases').onDelete('CASCADE')

    table.enum('status', ['QUEUE', 'RUN', 'REVIEW', 'FINISH', 'FAIL', 'ERROR'])
    table.enum('type', ['release']).defaultTo('release')

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
  return knex.schema.dropTableIfExists('cycles')
}
