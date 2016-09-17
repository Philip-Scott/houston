/**
 * test/lib/database.js
 * Tests database connection used for testing
 */

import mock from 'mock-require'
import path from 'path'
import test from 'ava'

import alias from 'root/.alias'
import mockConfig from 'test/fixtures/config'

test.beforeEach('setup configuration mock', (t) => {
  mock(path.resolve(alias.resolve.alias['root'], 'config.js'), mockConfig)
  t.context.database = require(path.resolve(alias.resolve.alias['lib'], 'database'))
})

test.todo('uses environment settings')
test.todo('can connect')
test.todo('throws error on unable to connect?')
