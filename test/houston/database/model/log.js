/**
 * test/houston/database/model/log.js
 * Tests the log model
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
  const Log = t.context.models.Log

  const one = await Log.count()
  const two = await Log.where('cycle_id', 3).count()

  t.is(one, 4)
  t.is(two, 2)
})

test.serial('has a good relationship with the cycle', async (t) => {
  const Log = t.context.models.Log

  const one = await Log.forge({'id': 1}).fetch({withRelated: 'cycle'})
  const two = await Log.forge({'id': 2}).fetch({withRelated: 'cycle'})
  const three = await Log.forge({'id': 3}).fetch({withRelated: 'cycle'})

  t.is(typeof one, 'object')
  t.is(typeof two, 'object')
  t.is(typeof three, 'object')

  t.is(one.related('cycle').get('status'), 'FINISH')
  t.is(two.related('cycle').get('status'), 'FINISH')
  t.is(three.related('cycle').get('status'), 'ERROR')
})
