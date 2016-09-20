/**
 * lib/validation.js
 * Creates a validation chain class
 *
 * @exports {Class} default - a validation class
 */

import _ from 'lodash'

/**
 * Validates values
 * Usage: new Validator('a value', 'invalid value').isInt()
 *
 * @param {*} arg - the argument to test
 * @param {String} message - the message to put on error if failed
 * @returns {Object} - this. literally this.
 *
 * @throws {ValidationError} - on a validation error
 */
export default class Validation {

  /**
   * creates a new Validation class
   *
   * @param {*} value - a value to test
   * @param {String} message - default message to show on error
   *
   * @throws {ValidationError} - on validation error
   */
  constructor (value, message) {
    this.value = value
    this.message = message

    this.isRequired = false

    this.failures = []
  }

  /**
   * Error
   * Creates a new ValidationError
   *
   * @param {String} message - the validation error message
   * @param {String} fn - function name that errored
   *
   * @returns {ValidationError} - a new validation error
   */
  static Error (message, fn) {
    if (this.message != null) message = this.message

    const err = new Error(message)
    err.test = fn
    err.code = 'VALERR'

    return err
  }

  /**
   * fail
   * Fails validation for a reason
   *
   * @param {String} msg - reason to fail test
   * @param {String} fn - function name that errored
   * @returns {Void}
   *
   * @throws {Validation.Error} - if a non optional test fails
   */
  fail (msg, fn) {
    this.failures.push(fn)

    if (!this.isRequired) return

    throw new Validation.Error(msg, fn)
  }

  /**
   * optional
   * Sets all following tests to be optional (opposite of notNull())
   *
   * @returns {Object} - this
   */
  optional () {
    this.isRequired = false
    return this
  }

  /**
   * notNull
   * Checks if value is null or undefined. Also sets all next tests to be
   * required. (opposite of optional())
   *
   * @returns {Object} - this
   */
  notNull () {
    this.isRequired = true

    if (this.value == null) this.fail('Null value', 'notNull')

    return this
  }

  /**
   * isInt
   * Checks if integer
   *
   * @param {Boolean} strict - if true will not try to parse
   * @returns {Object} - this
   */
  isInt (strict = false) {
    if (!strict) {
      try {
        this.value = parseInt(this.value)
      } catch (e) {
        this.fail('Not an integer', 'isInt')
      }
    }

    if (typeof this.value !== 'number') this.fail('Not an integer', 'isInt')
    if (isNaN(this.value)) this.fail('Not an integer', 'isInt')

    return this
  }

  /**
   * isDate
   * Checks if a valid date object
   *
   * @param {Boolean} strict - if true will not try to parse
   * @returns {Object} - this
   */
  isDate (strict = false) {
    if (!strict) {
      try {
        this.value = new Date(this.value)
      } catch (e) {
        this.fail('Not a date', 'isDate')
      }
    }

    if (isNaN(this.value)) this.fail('Not a date', 'isDate')
    if (!_.isDate(this.value)) this.fail('Not a date', 'isDate')

    return this
  }

  /**
   * isIn
   * Checks if value exists in array
   *
   * @link https://lodash.com/docs/4.16.0#find
   *
   * @param {String}[] list - a list to check in
   * @returns {Object} - this
   */
  isIn (list = []) {
    if (!_.isArray(list)) throw new Error('isIn was given a non array to check in')

    if (list.indexOf(this.value) === -1) this.fail('Not included in sample', 'isIn')

    return this
  }
}
