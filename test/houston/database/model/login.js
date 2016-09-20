/**
 * test/houston/database/model/login.js
 * Tests the login model
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
  const Login = t.context.models.Login

  const one = await Login.count()
  const two = await Login.where('user_id', 1).count()

  t.is(one, 3)
  t.is(two, 2)
})

test.serial('has a good relationship with the user', async (t) => {
  const Login = t.context.models.Login

  const one = await Login.forge({ id: 1 }).fetch({withRelated: 'user'})
  const two = await Login.forge({ id: 2 }).fetch({withRelated: 'user'})
  const three = await Login.forge({ id: 3 }).fetch({withRelated: 'user'})

  t.is(typeof one, 'object')
  t.is(typeof two, 'object')
  t.is(typeof three, 'object')

  t.is(one.related('user').get('username'), 'btkostner')
  t.is(two.related('user').get('username'), 'btkostner')
  t.is(three.related('user').get('username'), 'rabbitbot')
})
