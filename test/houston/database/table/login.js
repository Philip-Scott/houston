/**
 * test/login/database/modal/login.js
 * Tests logins table for needed fields
 */

import mock from 'mock-require'
import path from 'path'
import test from 'ava'

import alias from 'root/.alias'

import mockConfig from 'test/fixtures/config'

const databasePath = path.resolve(alias.resolve.alias['houston'], 'database')

test.beforeEach('setup configuration mock', async (t) => {
  mock(path.resolve(alias.resolve.alias['root'], 'config.js'), mockConfig)

  t.context.database = require(path.resolve(alias.resolve.alias['lib'], 'database'))
  t.context.helpers = require(path.resolve(databasePath, 'table', 'helpers'))

  await t.context.helpers.downAll(t.context.database.knex, '0.0.0')
  await t.context.helpers.upAll(t.context.database.knex)
})

test('has necessary table columns', async (t) => {
  const knex = t.context.database.knex

  const one = await knex.schema.hasTable('logins')

  const two = await knex.schema.hasColumn('logins', 'user_id')
  const three = await knex.schema.hasColumn('logins', 'service_name')
  const four = await knex.schema.hasColumn('logins', 'service_id')

  t.true(one)
  t.true(two)
  t.true(three)
  t.true(four)
})
