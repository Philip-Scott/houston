/**
 * houston/migration.js
 * Runs database migration for houston in a nice cli interface
 */

import semver from 'semver'

import * as cli from 'lib/cli'
import * as database from 'lib/database'
import * as helpers from './database/table/helpers'
import config from 'lib/config'
import log from 'lib/log'

const inter = new cli.Interface()

inter.title = 'Houston Migration'
inter.description = 'Run database migration for houston'
inter.usage = '[direction] [version] [table]'
inter.examples = ['up', 'up 0.3.2', 'down 0.0.0']

inter.tags = {}

const options = inter.parse()

const direction = options._[0] || 'up'
const version = options._[1] || config.houston.version
const table = options._[2]

if (direction !== 'up' && direction !== 'down') {
  inter.error('Direction can only be "up" or "down"')
}

if (semver.valid(version) == null) {
  inter.error('Version is not a valid semver version')
}

log.debug(`Running database migration ${direction} to ${version}`)

let promise = null

if (table == null && direction === 'up') {
  promise = helpers.upAll(database.knex, version)
} else if (table == null && direction === 'down') {
  promise = helpers.downAll(database.knex, version)
} else if (direction === 'up') {
  promise = helpers.up(database.knex, table, version)
} else if (direction === 'down') {
  promise = helpers.down(database.knex, table, version)
} else {
  promise = new Promise((resolve, reject) => reject('Unknown command'))
}

promise
.then(() => process.exit(0))
.catch((err) => {
  log.error(err)
  process.exit(1)
})
