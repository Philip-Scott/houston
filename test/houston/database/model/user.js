/**
 * test/houston/database/model/user.js
 * Tests the user model
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
  const User = t.context.models.User

  const one = await User.count()
  const two = await User.where('username', 'rabbitbot').count()

  t.is(one, 2)
  t.is(two, 1)
})

test.serial('has a good relationship with the cycle', async (t) => {
  const User = t.context.models.User

  const one = await User.forge({ id: 1 }).fetch({withRelated: 'logins'})
  const two = await User.forge({ id: 2 }).fetch({withRelated: 'logins'})

  t.is(typeof one, 'object')
  t.is(typeof two, 'object')

  t.is(one.related('logins').length, 2)
  t.is(two.related('logins').length, 1)
})
