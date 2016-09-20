/**
 * test/houston/databasse/validate/log.js
 * Validates the validation for log table
 */

import test from 'ava'

import * as helpers from 'test/houston/database/_helpers'
import Validate from 'houston/database/validate/log'

const validLog = {
  'id': 1,

  'cycle_id': 1,

  'service_id': 1,

  'title': 'testing',
  'body': 'testing log validation',

  'time_created': new Date(),
  'time_published': new Date()
}

/**
 * logValue
 * Changes a single value from a valid log object
 *
 * @param {String} key - the key in the object to change
 * @param {*} value - the value to change it to
 * @returns {Object} - the changed log object
 */
const logValue = (key, value) => {
  return Object.assign({}, validLog, {
    [key]: value
  })
}

test('it checks for valid id', (t) => {
  const one = logValue('id', 1)
  const two = logValue('id', '1')
  const three = logValue('id', 'one')
  const four = logValue('id', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid cycle_id', (t) => {
  const one = logValue('cycle_id', 1)
  const two = logValue('cycle_id', '1')
  const three = logValue('cycle_id', 'one')
  const four = logValue('cycle_id', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid title', (t) => {
  const one = logValue('title', 'this is a title')
  const two = logValue('title', 'noop')
  const three = logValue('title', 13)
  const four = logValue('title', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.notThrows(() => Validate(three))
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid time_created', (t) => {
  const one = logValue('time_created', new Date())
  const two = logValue('time_created', 123456)
  const three = logValue('time_created', '123456')
  const four = logValue('time_created', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.notThrows(() => Validate(three))
  t.throws(() => Validate(four), helpers.isValidationError)
})
