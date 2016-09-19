/**
 * test/houston/database/model/cycle.js
 * Tests the cycle model
 */

import mock from 'mock-require'
import path from 'path'
import test from 'ava'

import alias from 'root/.alias'

import * as testHelpers from './_helpers'
import mockConfig from 'test/fixtures/config'

const databasePath = path.resolve(alias.resolve.alias['houston'], 'database')

test.beforeEach('setup configuration mock', async (t) => {
  mock(path.resolve(alias.resolve.alias['root'], 'config.js'), mockConfig)

  t.context.database = require(path.resolve(alias.resolve.alias['lib'], 'database'))
  t.context.helpers = require(path.resolve(databasePath, 'table', 'helpers'))
  t.context.models = require(path.resolve(databasePath, 'model', 'index'))

  await t.context.helpers.downAll(t.context.database.knex, '0.0.0')
  await t.context.helpers.upAll(t.context.database.knex)
  await testHelpers.seed(t.context.database.knex, 'database_one')
})

test.serial('can count', async (t) => {
  const Cycle = t.context.models.Cycle

  const one = await Cycle.count()
  const two = await Cycle.where('release_id', 1).count()

  t.is(one, 4)
  t.is(two, 2)
})

test.serial('has a good relationship with issues', async (t) => {
  const Cycle = t.context.models.Cycle

  const one = await Cycle.forge({'id': 1}).issues().count()
  const two = await Cycle.forge({'id': 2}).issues().count()
  const three = await Cycle.forge({'id': 3}).issues().count()

  t.is(one, 0)
  t.is(two, 2)
  t.is(three, 2)
})
