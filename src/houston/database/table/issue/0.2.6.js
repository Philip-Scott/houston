/**
 * houston/database/table/issue/0.2.6.js
 * Creates the issue table for version 0.2.6
 *
 * @exports {Function} up - Creates a new database issue table
 * @exports {Function} down - Drops the current database issue table
 */

/**
 * up
 * Creates a new database issue table
 *
 * @param {Object} knex - an initalized knex object
 * @return {Void}
 */
export function up (knex) {
  return knex.schema.createTableIfNotExists('issues', (table) => {
    table.increments('key')

    table.integer('cycle_key').unsigned().references('key').inTable('cycles').onDelete('CASCADE')

    table.string('service_id')

    table.string('title').notNullable()
    table.text('body')

    table.timestamp('time_created').defaultTo(knex.fn.now())
    table.timestamp('time_published')
  })
}

/**
 * down
 * Drops the current database issue table
 *
 * @param {Object} knex - an initalized knex object
 * @return {Void}
 */
export function down (knex) {
  return knex.schema.dropTableIfExists('issues')
}
