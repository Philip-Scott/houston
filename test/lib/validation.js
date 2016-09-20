/**
 * test/lib/validation.js
 * Tests our validation library for accuracy
 */

import test from 'ava'

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
  t.throws(() => new Validation('a').notNull().isInt())
})

test('can set required and optional tests', (t) => {
  const one = new Validation('a')
  const two = new Validation('a').optional()
  const three = new Validation('a').optional().notNull()

  t.is(one.isRequired, false)
  t.is(two.isRequired, false)
  t.is(three.isRequired, true)
})

test('can check for null value', (t) => {
  t.throws(() => new Validation(null).notNull())
  t.throws(() => new Validation(undefined).notNull())

  t.notThrows(() => new Validation(0).notNull())
  t.notThrows(() => new Validation('null').notNull())
  t.notThrows(() => new Validation('undefined').notNull())
  t.notThrows(() => new Validation('1').notNull())
})

test('can check for non strict integers', (t) => {
  t.throws(() => new Val('-').isInt())
  t.throws(() => new Val('*').isInt())
  t.throws(() => new Val('a').isInt())
  t.throws(() => new Val(null).isInt())
  t.throws(() => new Val(undefined).isInt())

  t.notThrows(() => new Val(1).isInt())
  t.notThrows(() => new Val(0).isInt())
  t.notThrows(() => new Val(-1).isInt())
  t.notThrows(() => new Val('4').isInt())
  t.notThrows(() => new Val('-75').isInt())

  t.is(new Val('42').isInt().value, 42)
  t.is(new Val('-13').isInt().value, -13)
})

test('can check for strict integers', (t) => {
  t.throws(() => new Val('-').isInt(true))
  t.throws(() => new Val('2').isInt(true))
  t.throws(() => new Val('8').isInt(true))
  t.throws(() => new Val(null).isInt(true))
  t.throws(() => new Val(undefined).isInt(true))

  t.notThrows(() => new Val(1).isInt(true))
  t.notThrows(() => new Val(0).isInt(true))
  t.notThrows(() => new Val(-1).isInt(true))
})

test('can check for strict dates', (t) => {
  t.throws(() => new Val('not a date').isDate(true))
  t.throws(() => new Val().isDate(true))
  t.throws(() => new Val(123456).isDate(true))
  t.throws(() => new Val(null).isInt(true))

  t.notThrows(() => new Val(new Date()).isDate(true))
  t.notThrows(() => new Val(new Date(123456)).isDate(true))
})

test('can check for non strict dates', (t) => {
  t.throws(() => new Val('not a date').isDate())
  t.throws(() => new Val().isDate())
  t.throws(() => new Val(null).isInt())

  t.notThrows(() => new Val(new Date()).isDate())
  t.notThrows(() => new Val(new Date(123456)).isDate())
  t.notThrows(() => new Val(123456).isDate())
  t.notThrows(() => new Val('123456').isDate())
})

test('can check for values in list', (t) => {
  t.throws(() => new Val(1).isIn([2, 3, 4]))
  t.throws(() => new Val(null).isIn([1, 2, 3]))
  t.throws(() => new Val('t').isIn(['ab', 'ye', 'tu']))

  t.notThrows(() => new Val(1).isIn([1, 2, 3]))
  t.notThrows(() => new Val(null).isIn([1, null, 3]))
  t.notThrows(() => new Val('t').isIn(['a', 't', 'c']))
})
