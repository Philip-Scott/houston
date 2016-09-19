/**
 * test/houston/database/model/project.js
 * Tests the project model
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
  const Project = t.context.models.Project

  const one = await Project.count()
  const two = await Project.where('service_name', 'github').where('service_id', 2).count()

  t.is(one, 2)
  t.is(two, 1)
})

test.serial('has a good relationship with releases', async (t) => {
  const Project = t.context.models.Project

  const one = await Project.forge({'id': 1}).fetch({withRelated: 'releases'})
  const two = await Project.forge({'id': 2}).fetch({withRelated: 'releases'})

  t.is(typeof one, 'object')
  t.is(typeof two, 'object')

  t.is(one.related('releases').length, 3)
  t.is(two.related('releases').length, 0)
})

test.serial('has a good relationship with cycles', async (t) => {
  const Project = t.context.models.Project

  const one = await Project.forge({'id': 1}).fetch({withRelated: 'cycles'})
  const two = await Project.forge({'id': 2}).fetch({withRelated: 'cycles'})

  t.is(typeof one, 'object')
  t.is(typeof two, 'object')

  t.is(one.related('cycles').length, 4)
  t.is(two.related('cycles').length, 0)
})
