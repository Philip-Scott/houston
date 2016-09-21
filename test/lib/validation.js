/**
 * test/lib/validation.js
 * Tests our validation library for accuracy
 */

import test from 'ava'

import * as helpers from 'test/houston/database/_helpers'
import Validation from 'lib/validation'

/**
 * Val
 * A basic extention of Validation with notNull() automaticly being called
 */
class Val extends Validation {

  /**
   * creates a new Val class
   *
   * @param {...*} args - things to pass to Validation class
   */
  constructor (...args) {
    super(...args)
    this.isRequired = true
  }
}

test('it includes the validation library', (t) => {
  const e = Validation.Error('testing', 'test')

  t.is(e.message, 'testing')
  t.is(e.test, 'test')
  t.is(e.code, 'VALERR')
})

test('can chain functions', (t) => {
  t.notThrows(() => new Validation(1).notNull().notNull().notNull().isInt())
  t.notThrows(() => new Validation(1).notNull().isInt())
  t.throws(() => new Validation('a').notNull().isInt(), helpers.isValidationError)
})

test('can set required and optional tests', (t) => {
  const one = new Validation('a')
  const two = new Validation('a').optional()
  const three = new Validation('a').optional().notNull()

  t.is(one.isRequired, false)
  t.is(two.isRequired, false)
  t.is(three.isRequired, true)
})

test('can check for non strict null value', (t) => {
  t.throws(() => new Validation(null).notNull(), helpers.isValidationError)
  t.throws(() => new Validation(undefined).notNull(), helpers.isValidationError)

  t.notThrows(() => new Validation(0).notNull())
  t.notThrows(() => new Validation('null').notNull())
  t.notThrows(() => new Validation('undefined').notNull())
  t.notThrows(() => new Validation('1').notNull())
})

test('can check for strict null value', (t) => {
  t.throws(() => new Validation(0).notNull(true), helpers.isValidationError)
  t.throws(() => new Validation({}).notNull(true), helpers.isValidationError)
  t.throws(() => new Validation([]).notNull(true), helpers.isValidationError)
  t.throws(() => new Validation('').notNull(true), helpers.isValidationError)

  t.notThrows(() => new Validation(1).notNull(true))
  t.notThrows(() => new Validation('test').notNull(true))
})

test('can check for non strict integers', (t) => {
  t.throws(() => new Val('-').isInt(), helpers.isValidationError)
  t.throws(() => new Val('*').isInt(), helpers.isValidationError)
  t.throws(() => new Val('a').isInt(), helpers.isValidationError)
  t.throws(() => new Val(null).isInt(), helpers.isValidationError)
  t.throws(() => new Val(undefined).isInt(), helpers.isValidationError)

  t.notThrows(() => new Val(1).isInt())
  t.notThrows(() => new Val(0).isInt())
  t.notThrows(() => new Val(-1).isInt())
  t.notThrows(() => new Val('4').isInt())
  t.notThrows(() => new Val('-75').isInt())

  t.is(new Val('42').isInt().value, 42)
  t.is(new Val('-13').isInt().value, -13)
})

test('can check for strict integers', (t) => {
  t.throws(() => new Val('-').isInt(true), helpers.isValidationError)
  t.throws(() => new Val('2').isInt(true), helpers.isValidationError)
  t.throws(() => new Val('8').isInt(true), helpers.isValidationError)
  t.throws(() => new Val(null).isInt(true), helpers.isValidationError)
  t.throws(() => new Val(undefined).isInt(true), helpers.isValidationError)

  t.notThrows(() => new Val(1).isInt(true))
  t.notThrows(() => new Val(0).isInt(true))
  t.notThrows(() => new Val(-1).isInt(true))
})

test('can check for non strict strings', (t) => {
  t.throws(() => new Val(null).isString(), helpers.isValidationError)
  t.throws(() => new Val(undefined).isString(), helpers.isValidationError)

  t.notThrows(() => new Val(1).isString())
  t.notThrows(() => new Val('testing').isString())
  t.notThrows(() => new Val(new Date()).isString())

  t.is(new Val(42).isString().value, '42')
})

test('can check for strict strings', (t) => {
  t.throws(() => new Val(null).isString(), helpers.isValidationError)
  t.throws(() => new Val(undefined).isString(), helpers.isValidationError)

  t.notThrows(() => new Val(1).isString())
  t.notThrows(() => new Val('testing').isString())
  t.notThrows(() => new Val(new Date()).isString())

  t.is(new Val(42).isString().value, '42')
})

test('can check for strict booleans', (t) => {
  t.throws(() => new Val('false').isBoolean(), helpers.isValidationError)
  t.throws(() => new Val('true').isBoolean(), helpers.isValidationError)
  t.throws(() => new Val(0).isBoolean(), helpers.isValidationError)
  t.throws(() => new Val(1).isBoolean(), helpers.isValidationError)
  t.throws(() => new Val('nope').isBoolean(), helpers.isValidationError)
  t.throws(() => new Val(null).isBoolean(), helpers.isValidationError)

  t.notThrows(() => new Val(true).isBoolean())
  t.notThrows(() => new Val(false).isBoolean())

  t.true(new Val(true).isBoolean().value, true)
})

test('can check for non strict booleans', (t) => {
  t.notThrows(() => new Val(true).isBoolean(false))
  t.notThrows(() => new Val(false).isBoolean(false))
  t.notThrows(() => new Val('false').isBoolean(false))
  t.notThrows(() => new Val('true').isBoolean(false))
  t.notThrows(() => new Val(null).isBoolean(false))

  t.true(new Val('true').isBoolean(false).value)
  t.true(new Val('false').isBoolean(false).value) // yes, this is normal
  t.false(new Val(null).isBoolean(false).value)
})

test('can check for strict dates', (t) => {
  t.throws(() => new Val('not a date').isDate(true), helpers.isValidationError)
  t.throws(() => new Val().isDate(true), helpers.isValidationError)
  t.throws(() => new Val(123456).isDate(true), helpers.isValidationError)
  t.throws(() => new Val(null).isInt(true), helpers.isValidationError)

  t.notThrows(() => new Val(new Date()).isDate(true))
  t.notThrows(() => new Val(new Date(123456)).isDate(true))
})

test('can check for non strict dates', (t) => {
  t.throws(() => new Val('not a date').isDate(), helpers.isValidationError)
  t.throws(() => new Val().isDate(), helpers.isValidationError)
  t.throws(() => new Val(null).isInt(), helpers.isValidationError)

  t.notThrows(() => new Val(new Date()).isDate())
  t.notThrows(() => new Val(new Date(123456)).isDate())
  t.notThrows(() => new Val(123456).isDate())
  t.notThrows(() => new Val('123456').isDate())

  const one = new Val(123456).optional().isDate()
  const two = new Val('nope').optional().isDate()

  t.is(one.value.getTime(), 123456)
  t.is(two.value, null)
})

test('can check for values in list', (t) => {
  t.throws(() => new Val(1).isIn([2, 3, 4]), helpers.isValidationError)
  t.throws(() => new Val(null).isIn([1, 2, 3]), helpers.isValidationError)
  t.throws(() => new Val('t').isIn(['ab', 'ye', 'tu']), helpers.isValidationError)

  t.notThrows(() => new Val(1).isIn([1, 2, 3]))
  t.notThrows(() => new Val(null).isIn([1, null, 3]))
  t.notThrows(() => new Val('t').isIn(['a', 't', 'c']))
})

test('can check for valid RDNN', (t) => {
  t.throws(() => new Val('com.github').isRDNN(), helpers.isValidationError)
  t.throws(() => new Val(null).isRDNN(), helpers.isValidationError)
  t.throws(() => new Val('com.github.elementary.houston').isRDNN(5), helpers.isValidationError)
  t.throws(() => new Val('evil SQL statement\') DROP ALL;').isRDNN())

  t.notThrows(() => new Val('com.github').isRDNN(2))
  t.notThrows(() => new Val('com.github.elementary.houston').isRDNN())
  t.notThrows(() => new Val('com.repo.personal.project').isRDNN())
})

test('sanatizes RDNN', (t) => {
  const one = new Val('com.github.weird_repo#@.3e1t!repo').isRDNN()
  const two = new Val('com.github.hahaha_(){#$#}\'t.repo').isRDNN()

  t.is(one.value, 'com.github.weird-repo--.3e1t-repo')
  t.is(two.value, 'com.github.hahaha---------t.repo')
})

test('can check for possible url', (t) => {
  t.throws(() => new Val('github.com').isURL(), helpers.isValidationError)
  t.throws(() => new Val(null).isURL(), helpers.isValidationError)
  t.throws(() => new Val('https//google.com').isURL(), helpers.isValidationError)
  t.throws(() => new Val('obviously not a url').isURL())
  t.throws(() => new Val('nope://hahaha.co').isURL())

  t.notThrows(() => new Val('https://github.com').isURL())
  t.notThrows(() => new Val('http://www.google.com/project/repo.git').isURL())
  t.notThrows(() => new Val('ftp://repo.co').isURL(['ftp']))
})
