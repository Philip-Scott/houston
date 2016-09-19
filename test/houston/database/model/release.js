/**
 * test/houston/database/model/logrelease.js
 * Tests the logrelease model
 */

import mock from 'mock-require'
import path from 'path'
import semver from 'semver'
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
  const Release = t.context.models.Release

  const one = await Release.count()
  const two = await Release.where('service_id', 2).count()

  t.is(one, 4)
  t.is(two, 1)
})

test.serial('has a good relationship with the project', async (t) => {
  const Release = t.context.models.Release

  const one = await Release.forge({'id': 1}).fetch({withRelated: 'project'})

  t.is(typeof one, 'object')

  t.is(one.related('project').get('address'), 'com.github.elementary.houston')
})

test.serial('has a good relationship with cycles', async (t) => {
  const Release = t.context.models.Release

  const one = await Release.forge({'id': 1}).fetch({withRelated: 'cycles'})
  const two = await Release.forge({'id': 2}).fetch({withRelated: 'cycles'})
  const three = await Release.forge({'id': 3}).fetch({withRelated: 'cycles'})

  t.is(typeof one, 'object')
  t.is(typeof two, 'object')
  t.is(typeof three, 'object')

  t.is(one.related('cycles').length, 2)
  t.is(two.related('cycles').length, 1)
  t.is(three.related('cycles').length, 1)
})

test.serial('can be ordered in semver', async (t) => {
  const Release = t.context.models.Release

  const one = await Release.forge().orderSemver('ASC').fetchAll()
  const two = await Release.forge().orderSemver('DESC').fetchAll()

  t.is(typeof one, 'object')
  t.is(typeof two, 'object')

  const oneOrder = one.map((d) => `${d.get('version_major')}.${d.get('version_minor')}.${d.get('version_patch')}`)
  const twoOrder = two.map((d) => `${d.get('version_major')}.${d.get('version_minor')}.${d.get('version_patch')}`)

  oneOrder.forEach((a, i) => {
    if (oneOrder[i + 1] == null) return

    const b = oneOrder[i + 1]
    t.true(semver.lt(a, b))
  })

  twoOrder.forEach((a, i) => {
    if (twoOrder[i + 1] == null) return

    const b = twoOrder[i + 1]
    t.true(semver.gt(a, b))
  })
})
