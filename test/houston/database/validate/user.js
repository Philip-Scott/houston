/**
 * test/houston/databasse/validate/user.js
 * Validates the validation for user table
 */

import test from 'ava'

import * as helpers from 'test/houston/database/_helpers'
import Validate from 'houston/database/validate/user'

const validUser = {
  'id': 1,

  'username': 'btkostner',
  'email': 'fake@me.com',
  'avatar': '<svg></svg>',

  'right_review': true,
  'right_admin': true,

  'time_created': new Date(),
  'time_updated': new Date()
}

/**
 * userValue
 * Changes a single value from a valid user object
 *
 * @param {String} key - the key in the object to change
 * @param {*} value - the value to change it to
 * @returns {Object} - the changed user object
 */
const userValue = (key, value) => {
  return Object.assign({}, validUser, {
    [key]: value
  })
}

test('it checks for valid id', (t) => {
  const one = userValue('id', 1)
  const two = userValue('id', '1')
  const three = userValue('id', 'one')
  const four = userValue('id', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid username', (t) => {
  const one = userValue('username', 'btkostner')
  const two = userValue('username', 'rabbitbot')
  // const three = userValue('username', 'person with spaces')
  const four = userValue('username', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  // t.throws(() => Validate(three), helpers.isValidationError)
  t.throws(() => Validate(four), helpers.isValidationError)
})

test('it checks for valid email', (t) => {
  const one = userValue('email', 'test@person.cool')
  // const two = userValue('email', 'test.fun')
  // const three = userValue('email', 'test@fun')
  // const four = userValue('email', 13)
  const five = userValue('email', null)

  t.notThrows(() => Validate(one))
  // t.throws(() => Validate(two), helpers.isValidationError)
  // t.throws(() => Validate(three), helpers.isValidationError)
  // t.throws(() => Validate(four), helpers.isValidationError)
  t.throws(() => Validate(five), helpers.isValidationError)
})

test('it checks for valid right_review', (t) => {
  const one = userValue('right_review', true)
  const two = userValue('right_review', false)
  const three = userValue('right_review', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
})

test('it checks for valid right_admin', (t) => {
  const one = userValue('right_admin', true)
  const two = userValue('right_admin', false)
  const three = userValue('right_admin', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.throws(() => Validate(three), helpers.isValidationError)
})

test('it checks for valid time_created', (t) => {
  const one = userValue('time_created', new Date())
  const two = userValue('time_created', 123456)
  const three = userValue('time_created', '123456')
  const four = userValue('time_created', null)

  t.notThrows(() => Validate(one))
  t.notThrows(() => Validate(two))
  t.notThrows(() => Validate(three))
  t.throws(() => Validate(four), helpers.isValidationError)
})
