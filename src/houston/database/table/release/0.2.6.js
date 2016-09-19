/**
 * houston/database/table/release/0.2.6.js
 * Creates the release table for version 0.2.6
 *
 * @exports {Function} up - Creates a new database release table
 * @exports {Function} down - Drops the current database release table
 */

/**
 * up
 * Creates a new database release table
 *
 * @param {Object} knex - an initalized knex object
 * @return {Void}
 */
export function up (knex) {
  return knex.schema.createTableIfNotExists('releases', (table) => {
    table.increments('key')

    table.integer('project_key').notNullable().unsigned().references('key').inTable('projects').onDelete('CASCADE')

    table.string('service_id').notNullable()

    table.string('tag').notNullable()
    table.string('version')
    table.string('author')

    table.timestamp('time_created')
    table.timestamp('time_added').defaultTo(knex.fn.now())
    table.timestamp('time_published')
  })
}

/**
 * down
 * Drops the current database release table
 *
 * @param {Object} knex - an initalized knex object
 * @return {Void}
 */
export function down (knex) {
  return knex.schema.dropTableIfExists('releases')
}
