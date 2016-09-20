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
    table.increments('id')

    table.integer('project_id').notNullable().unsigned().references('id').inTable('projects').onDelete('CASCADE')
    table.integer('release_id').unsigned().references('id').inTable('releases').onDelete('CASCADE')

    table.enum('status', ['QUEUE', 'RUN', 'REVIEW', 'FINISH', 'FAIL', 'ERROR'])
    table.enum('type', ['RELEASE']).defaultTo('RELEASE')

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
