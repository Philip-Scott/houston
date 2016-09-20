/**
 * test/houston/databasse/validate/cycle.js
 * Validates the validation for cycle table
 */

import test from 'ava'

import * as helpers from 'test/houston/database/_helpers'
import Validate from 'houston/database/validate/cycle'

const validCycle = {
  'id': 1,

  'project_id': 1,
  'release_id': 1,

  'status': 'QUEUE',
  'type': 1,

  'time_created': new Date(),
  'time_ran': new Date(),
  'time_finished': new Date()
}

/**
 * cycleValue
 * Changes a single value from a valid cycle object
 *
 * @param {String} key - the key in the object to change
 * @param {*} value - the value to change it to
 * @returns {Object} - the changed cycle object
 */
const cycleValue = (key, value) => {
  return Object.assign({}, validCycle, {
    [key]: value
  })
}

test('it checks for valid id', (t) => {
  const one = cycleValue('id', 1)
  const two = cycleValue('id', '1')
  const three = cycleValue('id', 'one')
  const four = cycleValue('id', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid project_id', (t) => {
  const one = cycleValue('project_id', 1)
  const two = cycleValue('project_id', '1')
  const three = cycleValue('project_id', 'one')
  const four = cycleValue('project_id', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid time_created', (t) => {
  const one = cycleValue('time_created', new Date())
  const two = cycleValue('time_created', 123456)
  const three = cycleValue('time_created', '123456')
  const four = cycleValue('time_created', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.notThrows(() => Validate(three))
  t.throws(() => Validate(four), helpers.isValidationError)
})
