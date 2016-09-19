/**
 * test/houston/database/model/_helpers.js
 * Some helper functions for testing database models
 *
 * @exports {function} seed - Seeds random data into the database
 */

import Promise from 'bluebird'

import fixtures from './fixtures'

/**
 * seed
 * Seeds random data into the database for mock testing
 *
 * @param  {Object} knex - an initalized knex object
 * @param  {String} database - database name as found in fixtures directory
 *
 * @return {Promise} - a promise of success
 */
export function seed (knex, database) {
  if (typeof knex.schema.table !== 'function') throw new Error('Invalid knex object')
  if (fixtures[database] == null) throw new Error('Unknown database to seed')

  const tables = fixtures[database]

  return Promise.each(Object.keys(tables), async (table) => {
    if (!await knex.schema.hasTable(table)) {
      throw new Error(`Table ${table} does not exist in database`)
    }

    return Promise.each(tables[table], (data) => knex(table).insert(data))
  })
}
