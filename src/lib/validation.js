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
 * TODO: add url validation
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

    this.failures = {
      optional: [],
      required: []
    }
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
    if (this.isRequired) {
      this.failures['required'].push([msg, fn])
    } else {
      this.failures['optional'].push([msg, fn])
    }

    if (!this.isRequired) return

    throw new Validation.Error(`${this.message}: ${msg}`, fn)
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
   * @param {Boolean} strict - if true items like 0 and no length strings will fail
   * @returns {Object} - this
   */
  notNull (strict = false) {
    this.isRequired = true

    this.failures['required'].forEach((failure) => {
      this.fail(...failure)
    })

    if (this.value == null) this.fail('Null value', 'notNull')
    if (strict && this.value.length != null && this.value.length < 1) this.fail('Empty object', 'notNull')
    if (strict && _.isPlainObject(this.value) && _.isEmpty(this.value)) this.fail('Empty object', 'notNull')
    if (strict && this.value === '') this.fail('Empty string', 'notNull')
    if (strict && this.value === 0) this.fail('Zero value', 'notNull')

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

    if (
      typeof this.value !== 'number' ||
      isNaN(this.value)
    ) {
      this.value = null
      this.fail('Not an integer', 'isInt')
    }

    return this
  }

  /**
   * isString
   * Checks if string value
   *
   * @param {Boolean} strict - if true will not try to parse
   * @returns {Object} - this
   */
  isString (strict = false) {
    // String function will take a lot of things, so lets rule out the obvious first
    if (this.value == null) this.fail('Not a string', 'isString')
    if (strict && typeof this.value === 'object') this.fail('Not a string', 'isString') // don't convert

    if (!strict) {
      try {
        this.value = String(this.value)
      } catch (e) {
        this.fail('Not a string', 'isString')
      }
    }

    if (
      typeof this.value !== 'string'
    ) {
      this.value = null
      this.fail('Not a string', 'isString')
    }

    return this
  }

  /**
   * isBoolean
   * Checks if boolean
   *
   * @param {Boolean} strict - if true will not try to parse
   * @returns {Object} - this
   */
  isBoolean (strict = true) {
    if (!strict) {
      this.value = Boolean(this.value)
    }

    if (
      this.value !== true && this.value !== false
    ) {
      this.value = null
      this.fail('Not a boolean', 'isBoolean')
    }

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

    if (
      isNaN(this.value) ||
      !_.isDate(this.value)
    ) {
      this.value = null
      this.fail('Not a date', 'isDate')
    }

    return this
  }

  /**
   * isIn
   * Checks if value exists in array
   *
   * @param {Array} list - a list to check in
   * @returns {Object} - this
   */
  isIn (list = []) {
    if (!_.isArray(list)) throw new Error('isIn was given a non array to check in')

    if (list.indexOf(this.value) === -1) this.fail('Not included in sample', 'isIn')

    return this
  }

  /**
   * isRDNN
   * Checks if value is valid reverse domain name notation
   *
   * @param {Number} min - the minimum number of parts in the RDNN
   * @returns {Object} - this
   */
  isRDNN (min = 3) {
    this.isString(true)

    const parts = this.value.split('.')
    if (parts.length < 1 || parts.length < min) this.fail('Not valid RDNN', 'isRDNN')

    this.value = parts.map((value) => value.replace(/[`~!@#$%^&*()_|+=?;:'",<>\{\}\[\]\\\/`\s]/gi, '-')).join('.')

    return this
  }

  /**
   * isURL
   * Checks if value could POSSIBLY be a url with full protocol
   *
   * @param {String} protos - a list of valid protocols
   * @returns {Object} - this
   */
  isURL (protos = ['http', 'https']) {
    this.isString(true)

    // Fail if we are unable to test or split on the value
    try {
      if (!/:\/\//.test(this.value)) this.fail('Does not include protocol', 'isURL')

      const [proto] = this.value.split('://')
      if (protos.indexOf(proto) === -1) this.fail('Is not in list of valid protocols', 'isURL')
    } catch (e) {
      this.fail('Not valid URL', 'isURL')
    }

    return this
  }
}
