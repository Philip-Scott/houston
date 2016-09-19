/**
 * houston/database/table/project/0.2.6.js
 * Creates the project table for version 0.2.6
 *
 * @exports {Function} up - Creates a new database project table
 * @exports {Function} down - Drops the current database project table
 */

/**
 * up
 * Creates a new database project table
 *
 * @param {Object} knex - an initalized knex object
 * @return {Void}
 */
export function up (knex) {
  return knex.schema.createTableIfNotExists('projects', (table) => {
    table.increments('id')

    table.string('service_name').notNullable()
    table.string('service_id').notNullable()

    table.string('name')
    table.string('address').notNullable().unique().index()
    table.enum('type', ['application']).defaultTo('application')
    table.text('icon')

    table.string('repository').notNullable().unique()
    table.string('tag').defaultTo('master')

    table.timestamp('time_created')
    table.timestamp('time_added').defaultTo(knex.fn.now())
    table.timestamp('time_published')
  })
}

/**
 * down
 * Drops the current database project table
 *
 * @param {Object} knex - an initalized knex object
 * @return {Void}
 */
export function down (knex) {
  return knex.schema.dropTableIfExists('projects')
}
