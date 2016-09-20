/**
 * test/houston/database/_helpers.js
 * Includes some useful helpers for testing database functions
 *
 * @exports {Function} isValidationError - tests if error is validation error
 */

/**
 * isValidationError
 * Tests if error is a validation error
 *
 * @param {Error} v - error to test
 * @returns {Boolean} - true if error is from validation
 */
export function isValidationError (v) {
  return (v.code === 'VALERR')
}
