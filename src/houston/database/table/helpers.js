/**
 * houston/database/table/helpers.js
 * Aggregates database table migration to smaller functions for easier working
 *
 * @exports {Function} currentVersion - grabs current semver version of database
 * @exports {Function} getUpdates - grabs all needed upgrades for a table
 * @exports {Function} up - upgrades a table to X version
 * @exports {Function} down - downgrades a table to X version
 */

import Promise from 'bluebird'
import semver from 'semver'

import config from 'lib/config'
import log from 'lib/log'
import tables from './index'

/**
 * currentVersion
 * Returns the current version of tables the database uses
 *
 * @param {Object} knex - an initalized knex instance
 * @returns {String} - semver of current database table version
 */
export async function currentVersion (knex) {
  const table = await knex.schema.hasTable('houston')

  if (!table) {
    log.debug('Database does not include houston table. Assuming clean')
    return '0.0.0'
  }

  const updates = await knex.select('table_to').from('houston').orderBy('updated_at', 'desc').limit(1)

  if (updates.length === 0) {
    log.debug('Database includes houston table, but no rows exist')
    return '0.0.0'
  } else {
    const version = semver.valid(updates[0]['table_to']) || '0.0.0'

    log.debug(`Database includes houston table. Currently version ${version}`)
    return version
  }
}

/**
 * getUpdates
 * Grabs all needed upgrades for a table
 *
 * @param {String} table - name of table to get updates for
 * @param {String} fro - version to upgrade from
 * @param {String} to - version to upgrade to
 * @param {Object} tables - object of tables to use
 * @returns {Object}[] - a collection of functions sorted in upgrade order
 *
 * @throws {Error} - if table configuration does not exist
 * @throws {Error} - if invalid semver version
 */
export function getUpdates (table, fro, to = config.houston.version) {
  if (tables[table] == null) throw new Error('Table does not exist')
  if (!semver.valid(to)) throw new Error('Invalid upgrade semver version number')

  const arr = []
  Object.keys(tables[table]).forEach((key) => arr.push([key, tables[table][key]]))

  return arr
  .filter((a) => semver.valid(a[0]))
  .sort((a, b) => semver.compare(a[0], b[0]))
  .map((a) => a[1])
}

/**
 * up
 * Upgrades current existing table
 *
 * @param {Object} knex - an initalized knex instance
 * @param {String} table - a valid table name
 * @param {String} to - semver version to upgrade table to
 * @returns {Void}
 *
 * @throws {Error} - if invalid knex object
 * @throws {Error} - if table configuration does not exist
 * @throws {Error} - if invalid semver version
 */
export async function up (knex, table, to = config.houston.version) {
  if (typeof knex.schema.table !== 'function') throw new Error('Invalid knex object')
  if (tables[table] === null) throw new Error('Table does not exist')
  if (!semver.valid(to)) throw new Error('Invalid upgrade semver version number')

  const updates = getUpdates(table, undefined, to)

  log.debug(`Running ${updates.length} up migrations to ${table} table`)

  return Promise.each(updates, (update) => update.up(knex))
}

/**
 * down
 * Downgrades current existing table
 *
 * @param {Object} knex - an initalized knex instance
 * @param {String} table - a valid table name
 * @param {String} to - semver version to downgrade table to (0.0.0 for drop)
 * @returns {Void}
 *
 * @throws {Error} - if invalid knex object
 * @throws {Error} - if table configuration does not exist
 * @throws {Error} - if invalid semver version
 */
export async function down (knex, table, to = '0.0.0') {
  if (typeof knex.schema.table !== 'function') throw new Error('Invalid knex object')
  if (tables[table] === null) throw new Error('Table does not exist')
  if (!semver.valid(to)) throw new Error('Invalid downgrade semver version number')

  const updates = getUpdates(table, to, await currentVersion(knex)).reverse()

  log.debug(`Running ${updates.length} down migrations to ${table} table`)

  return Promise.each(updates, (update) => update.down(knex))
}

/**
 * upAll
 * Upgrades all tables to version
 *
 * @param {Object} knex - an initalized knex instance
 * @param {String} to - semver version to upgrade table to
 * @returns {Void}
 *
 * @throws {Error} - if invalid knex object
 * @throws {Error} - if invalid semver version
 */
export function upAll (knex, to = config.houston.version) {
  if (typeof knex.schema.table !== 'function') throw new Error('Invalid knex object')
  if (!semver.valid(to)) throw new Error('Invalid upgrade semver version number')

  return Promise.each(Object.keys(tables), (table) => up(knex, table, to))
}

/**
 * downAll
 * Downgrades all tables to version
 *
 * @param {Object} knex - an initalized knex instance
 * @param {String} to - semver version to downgrade table to
 * @returns {Void}
 *
 * @throws {Error} - if invalid knex object
 * @throws {Error} - if invalid semver version
 */
export function downAll (knex, to = config.houston.version) {
  if (typeof knex.schema.table !== 'function') throw new Error('Invalid knex object')
  if (!semver.valid(to)) throw new Error('Invalid downgrade semver version number')

  return Promise.each(Object.keys(tables), (table) => up(knex, table, to))
}
