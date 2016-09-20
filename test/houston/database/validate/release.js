/**
 * test/houston/databasse/validate/release.js
 * Validates the validation for release table
 */

import test from 'ava'

import * as helpers from 'test/houston/database/_helpers'
import Validate from 'houston/database/validate/release'

const validRelease = {
  'id': 1,

  'project_id': 1,

  'service_id': '1',

  'tag': 'master',
  'author': 'btkostner',

  'version_major': 1,
  'version_minor': 0,
  'version_patch': 0,

  'time_created': new Date(),
  'time_added': new Date()
}

/**
 * releaseValue
 * Changes a single value from a valid release object
 *
 * @param {String} key - the key in the object to change
 * @param {*} value - the value to change it to
 * @returns {Object} - the changed release object
 */
const releaseValue = (key, value) => {
  return Object.assign({}, validRelease, {
    [key]: value
  })
}

test('it checks for valid id', (t) => {
  const one = releaseValue('id', 1)
  const two = releaseValue('id', '1')
  const three = releaseValue('id', 'one')
  const four = releaseValue('id', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid project_id', (t) => {
  const one = releaseValue('project_id', 1)
  const two = releaseValue('project_id', '1')
  const three = releaseValue('project_id', 'one')
  const four = releaseValue('project_id', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid service_id', (t) => {
  const one = releaseValue('service_id', 'this is a title')
  const two = releaseValue('service_id', 'noop')
  const three = releaseValue('service_id', 13)
  const four = releaseValue('service_id', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.notThrows(() => Validate(three))
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid tag', (t) => {
  const one = releaseValue('tag', 'master')
  const two = releaseValue('tag', 'development')
  // const three = releaseValue('tag', 'not a valid tag')
  const four = releaseValue('tag', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  // t.throws(() => Validate(three), helpers.isValidationError)
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid version_major', (t) => {
  const one = releaseValue('version_major', 1)
  const two = releaseValue('version_major', '0')
  const three = releaseValue('version_major', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
})

test('it checks for valid version_minor', (t) => {
  const one = releaseValue('version_major', 32)
  const two = releaseValue('version_major', '12')
  const three = releaseValue('version_major', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
})

test('it checks for valid version_patch', (t) => {
  const one = releaseValue('version_patch', 0)
  const two = releaseValue('version_patch', '1')
  // const three = releaseValue('version_patch', -4)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  // t.throws(() => Validate(three), helpers.isValidationError)
})

test('it checks for valid time_created', (t) => {
  const one = releaseValue('time_created', new Date())
  const two = releaseValue('time_created', 123456)
  const three = releaseValue('time_created', '123456')
  const four = releaseValue('time_created', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.notThrows(() => Validate(three))
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid time_added', (t) => {
  const one = releaseValue('time_added', new Date())
  const two = releaseValue('time_added', 123456)
  const three = releaseValue('time_added', '123456')
  const four = releaseValue('time_added', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.notThrows(() => Validate(three))
  t.throws(() => Validate(four), helpers.isValidationError)
})
