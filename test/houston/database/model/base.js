/**
 * test/houston/database/model/base.js
 * Tests the base model for various effects
 * NOTE: we test functions on the projects table
 */

import mock from 'mock-require'
import path from 'path'
import test from 'ava'

import alias from 'root/.alias'

import * as helpers from 'test/houston/database/_helpers'
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

test.serial('can validate an object staticly', async (t) => {
  const Project = t.context.models.Project

  const one = { id: 'swag' }
  const two = {
    'id': 1,
    'service_name': 'github',
    'service_id': 'elementary/testing',
    'address': 'com.github.elementary.testing',
    'type': 'application',
    'repository': 'https://github.com/elementary/testing.git',
    'tag': 'master',
    'time_created': new Date(),
    'time_added': new Date()
  }

  t.throws(() => Project.validate(one), helpers.isValidationError)
  t.notThrows(() => Project.validate(two))
})

test.serial('has an accurate find function', async (t) => {
  const Project = t.context.models.Project

  const one = await Project.find({ 'service_name': 'github' })
  const two = await Project.find({ 'service_id': 2 })

  t.is(one.length, 2)
  t.is(two.length, 1)
})

test.serial('has an accurate findOne function', async (t) => {
  const Project = t.context.models.Project

  const one = await Project.findOne({ 'service_name': 'github' })
  const two = await Project.findOne({ 'type': 'application' })

  t.is(one.get('address'), 'com.github.elementary.houston')
  t.is(two.get('address'), 'com.github.elementary.houston')
  t.deepEqual(one.toJSON(), two.toJSON())
})

test.serial('has an accurate findById function', async (t) => {
  const Project = t.context.models.Project

  const one = await Project.findById(1)
  const two = await Project.findById(2)

  t.is(one.get('address'), 'com.github.elementary.houston')
  t.is(two.get('address'), 'com.github.elementary.vocal')
})

test.serial('findById parses strings to numbers', async (t) => {
  const Project = t.context.models.Project

  const one = await Project.findById('1')
  const two = await Project.findById('2')

  t.is(one.get('address'), 'com.github.elementary.houston')
  t.is(two.get('address'), 'com.github.elementary.vocal')
})

test.serial('has an accurate create function', async (t) => {
  const knex = t.context.database.knex
  const Project = t.context.models.Project

  const date = new Date()

  const one = await Project.create({
    'service_name': 'github',
    'service_id': '0',

    'name': 'testing',
    'address': 'com.github.elementary.testing',
    'type': 'application',

    'repository': 'https://github.com/elementary/testing.git',
    'tag': 'master',

    'time_created': date
  })

  t.is(typeof one.get('id'), 'number')

  // NOTE: we use pure knex here so we don't rely on other functions being tested
  const two = await knex.select('*').from('projects').where('id', one.get('id'))

  t.is(two[0]['name'], 'testing')
  t.is(two[0]['address'], 'com.github.elementary.testing')
  t.is(two[0]['time_created'], date.getTime())
})

test.serial('has an accurate update function', async (t) => {
  const knex = t.context.database.knex
  const Project = t.context.models.Project

  const date = new Date()

  // NOTE: we are going to use a tested function. If create() fails, this test
  // will also fail
  const one = await Project.create({
    'service_name': 'github',
    'service_id': '0',

    'name': 'testing',
    'address': 'com.github.elementary.testing',
    'type': 'application',

    'repository': 'https://github.com/elementary/testing.git',
    'tag': 'master',

    'time_created': date
  })

  t.is(typeof one.get('id'), 'number')

  const two = await one.update({
    'name': 'testing update',
    'address': 'com.github.elementary.testing_update'
  })

  t.is(typeof two.get('id'), 'number')
  t.is(one, two)

  const three = await knex.select('*').from('projects').where('id', two.get('id'))

  t.is(three[0]['service_name'], 'github')
  t.is(three[0]['service_id'], '0')
  t.is(three[0]['name'], 'testing update')
  t.is(three[0]['address'], 'com.github.elementary.testing_update')
})
