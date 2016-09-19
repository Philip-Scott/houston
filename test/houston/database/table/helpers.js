/**
 * test/houston/database/table/helpers.js
 * Tests various functions used in database migration
 *
 * FIXME: mocking of database tables is not working. Currently skipping
 * migration tests
 */

import mock from 'mock-require'
import path from 'path'
import test from 'ava'

import alias from 'root/.alias'

import mockIndex from './fixtures'
import mockConfig from 'test/fixtures/config'

const currentDir = path.resolve(alias.resolve.alias['test'], 'houston', 'database', 'table')
const tablePath = path.resolve(alias.resolve.alias['houston'], 'database', 'table')

test.beforeEach('setup configuration mock', (t) => {
  mock(path.resolve(alias.resolve.alias['root'], 'config.js'), mockConfig)

  // FIXME: we are not successfully mocking the table index.
  // This needs fixed so we can unskip the last tests
  mock(path.resolve(tablePath, 'index.js'), mockIndex)

  t.context.database = require(path.resolve(alias.resolve.alias['lib'], 'database'))
  t.context.helpers = require(path.resolve(tablePath, 'helpers'))

  return t.context.helpers.downAll(t.context.database.knex, '0.0.0')
})

test('new databases show as 0.0.0 version', async (t) => {
  const currentVersion = t.context.helpers.currentVersion
  const knex = t.context.database.knex

  const version = await currentVersion(knex)

  t.is(version, '0.0.0')
})

test('returns correct database version on existing instance', async (t) => {
  const currentVersion = t.context.helpers.currentVersion
  const knex = t.context.database.knex

  await t.context.helpers.up(knex, 'houston')

  await knex('houston').insert({
    table_to: '0.0.1',
    table_from: '0.0.0',
    time_created: new Date(0)
  })

  await knex('houston').insert({
    table_to: '0.1.0',
    table_from: '0.0.1',
    time_created: new Date(1000)
  })

  await knex('houston').insert({
    table_to: '0.2.0',
    table_from: '0.1.0',
    time_created: new Date(2000)
  })

  const version = await currentVersion(knex)

  t.is(version, '0.2.0')
})

test.skip('can find needed migration files', (t) => {
  const getUpdates = t.context.helpers.getUpdates

  const one = getUpdates('table_one', '0.0.0', '0.0.2')
  const two = getUpdates('table_one', '0.0.0', '0.0.4')
  const three = getUpdates('table_one', '0.0.2', '0.0.3')

  t.is(one.length, 2)
  t.is(two.length, 4)
  t.is(three.length, 1)
})

test.skip('updates table columns on upgrade', async (t) => {
  const fixturesPath = path.resolve(currentDir, 'fixtures', 'migration')
  const knex = t.context.database.knex
  const up = t.context.helpers.up

  await up(knex, 'user', '0.0.4', fixturesPath)

  const one = await knex.schema.hasColumn('users', 'column_one')
  const two = await knex.schema.hasColumn('users', 'column_two')
  const three = await knex.schema.hasColumn('users', 'column_three')
  const four = await knex.schema.hasColumn('users', 'column_four')

  t.true(one)
  t.true(two)
  t.false(three)
  t.false(four)
})
