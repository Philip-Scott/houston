/**
 * test/houston/database/table/fixtures/table_one/0.0.3.js
 * A sample table construction used for testing
 *
 * @exports {Function} up - Updates / upgrades table
 */

/**
 * up
 * Creates / updates users table
 *
 * @param {Object} knex - an initalized knex Object
 * @returns {Promise} - a promise of success
 */
export function up (knex) {
  return knex.schema.table('table_one', (table) => {
    table.dropColumn('column_three')
  })
}
