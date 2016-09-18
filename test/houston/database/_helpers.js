/**
 * test/houston/database/_helpers.js
 * Some helper functions for ensuring you are always testing on a clean slate
 */

const tables = [
  'houston',

  'users'
]

/**
 * dropAll
 * Drops every table in the database
 *
 * @param {Object} knex - an initalized knex object
 * @returns {Promise} - a promise of success
 *
 * @throws {Error} - if invalid knex param
 */
export function dropAll (knex) {
  if (typeof knex.schema.dropTableIfExists !== 'function') {
    throw new Error('dropAll given invalid knex instance')
  }

  const promises = tables.map((table) => knex.schema.dropTableIfExists(table))

  return Promise.all(promises)
}
