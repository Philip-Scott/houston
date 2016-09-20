/**
 * test/houston/databasse/validate/login.js
 * Validates the validation for login table
 */

import test from 'ava'

import * as helpers from 'test/houston/database/_helpers'
import Validate from 'houston/database/validate/login'

const validLogin = {
  'id': 1,

  'user_id': 1,

  'service_name': 'github',
  'service_id': '1',
  'service_access': 'access code',
  'service_refresh': 'refresh token',

  'time_created': new Date(),
  'time_updated': new Date(),
  'time_used': new Date()
}

/**
 * loginValue
 * Changes a single value from a valid login object
 *
 * @param {String} key - the key in the object to change
 * @param {*} value - the value to change it to
 * @returns {Object} - the changed login object
 */
const loginValue = (key, value) => {
  return Object.assign({}, validLogin, {
    [key]: value
  })
}

test('it checks for valid ID', (t) => {
  const one = loginValue('id', 1)
  const two = loginValue('id', '1')
  const three = loginValue('id', 'one')
  const four = loginValue('id', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid user_id', (t) => {
  const one = loginValue('user_id', 1)
  const two = loginValue('user_id', '1')
  const three = loginValue('user_id', 'one')
  const four = loginValue('user_id', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid service_name', (t) => {
  const one = loginValue('service_name', 'this is a title')
  const two = loginValue('service_name', 'noop')
  const three = loginValue('service_name', 13)
  const four = loginValue('service_name', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.notThrows(() => Validate(three))
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid service_id', (t) => {
  const one = loginValue('service_id', 'this is a title')
  const two = loginValue('service_id', 'noop')
  const three = loginValue('service_id', 13)
  const four = loginValue('service_id', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.notThrows(() => Validate(three))
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid time_created', (t) => {
  const one = loginValue('time_created', new Date())
  const two = loginValue('time_created', 123456)
  const three = loginValue('time_created', '123456')
  const four = loginValue('time_created', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.notThrows(() => Validate(three))
  t.throws(() => Validate(four), helpers.isValidationError)
})
