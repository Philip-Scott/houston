/**
 * test/houston/database/modal/user.js
 * Tests modal usage for users
 */

import mock from 'mock-require'
import path from 'path'
import test from 'ava'

import * as helpers from 'houston/database/table/helpers'
import alias from 'root/.alias'

import mockConfig from 'test/fixtures/config'

const modalPath = path.resolve(alias.resolve.alias['houston'], 'database')

test.beforeEach('setup configuration mock', async (t) => {
  mock(path.resolve(alias.resolve.alias['root'], 'config.js'), mockConfig)

  t.context.database = require(path.resolve(alias.resolve.alias['lib'], 'database'))
  t.context.table = require(path.resolve(modalPath, 'table', 'helpers'))
  t.context.user = require(path.resolve(modalPath, 'modal', 'user')).default

  await helpers.downAll(t.context.database.knex, '0.0.0')
  await t.context.table.up(t.context.database.knex, 'user')
})

test('has necessary table columns', async (t) => {
  const knex = t.context.database.knex

  const one = await knex.schema.hasTable('users')

  const two = await knex.schema.hasColumn('users', 'username')
  const three = await knex.schema.hasColumn('users', 'email')
  const four = await knex.schema.hasColumn('users', 'right')

  t.true(one)
  t.true(two)
  t.true(three)
  t.true(four)
})
