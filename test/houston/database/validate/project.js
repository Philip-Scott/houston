/**
 * test/houston/databasse/validate/project.js
 * Validates the validation for project table
 */

import test from 'ava'

import * as helpers from 'test/houston/database/_helpers'
import Validate from 'houston/database/validate/project'

const validProject = {
  'id': 1,

  'service_name': 'github',
  'service_id': '1',

  'name': 'elementary Testing',
  'address': 'com.github.elementary.testing',
  'type': 'application',
  'icon': '<svg></svg>',

  'repository': 'https://github.com/elementary/testing.git',
  'tag': 'master',

  'time_created': new Date(),
  'time_added': new Date()
}

/**
 * projectValue
 * Changes a single value from a valid project object
 *
 * @param {String} key - the key in the object to change
 * @param {*} value - the value to change it to
 * @returns {Object} - the changed project object
 */
const projectValue = (key, value) => {
  return Object.assign({}, validProject, {
    [key]: value
  })
}

test('it checks for valid ID', (t) => {
  const one = projectValue('id', 1)
  const two = projectValue('id', '1')
  const three = projectValue('id', 'one')
  const four = projectValue('id', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid service_name', (t) => {
  const one = projectValue('service_name', 'github')
  const two = projectValue('service_name', 'gitlabs')
  const three = projectValue('service_name', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
})

test('it checks for valid service_id', (t) => {
  const one = projectValue('service_id', 'this is a title')
  const two = projectValue('service_id', 'noop')
  const three = projectValue('service_id', 13)
  const four = projectValue('service_id', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.notThrows(() => Validate(three))
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid address', (t) => {
  const one = projectValue('address', 'com.github.elementary.testing')
  const two = projectValue('address', 'net.local.gitlabs')
  const three = projectValue('address', 'https://notanaddress.com')
  const four = projectValue('address', 'NOPE')
  const five = projectValue('address', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
  t.throws(() => Validate(four), helpers.isValidationError)
  t.throws(() => Validate(five), helpers.isValidationError)
})

test('it checks for valid type', (t) => {
  const one = projectValue('type', 'application')
  const two = projectValue('type', 'library')
  const three = projectValue('type', null)

  t.notThrows(() => Validate(one))
  t.throws(() => Validate(two), helpers.isValidationError)
  t.throws(() => Validate(three), helpers.isValidationError)
})

test('it checks for valid repository', (t) => {
  const one = projectValue('repository', 'https://github.com/elementary/testing.git')
  const two = projectValue('repository', 'http://local.fun/project')
  const three = projectValue('repository', 'ssh://git@github.com:elementary/testing.git')
  const four = projectValue('repository', 'ftp://oldschool.com:42')
  const five = projectValue('repository', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.notThrows(() => Validate(three))
  t.throws(() => Validate(four), helpers.isValidationError)
  t.throws(() => Validate(five), helpers.isValidationError)
})

test('it checks for valid time_created', (t) => {
  const one = projectValue('time_created', new Date())
  const two = projectValue('time_created', 123456)
  const three = projectValue('time_created', '123456')
  const four = projectValue('time_created', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.notThrows(() => Validate(three))
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid time_added', (t) => {
  const one = projectValue('time_added', new Date())
  const two = projectValue('time_added', 123456)
  const three = projectValue('time_added', '123456')
  const four = projectValue('time_added', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.notThrows(() => Validate(three))
  t.throws(() => Validate(four), helpers.isValidationError)
})
