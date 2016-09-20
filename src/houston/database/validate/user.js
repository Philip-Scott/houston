/**
 * houston/database/validate/user.js
 * Validates information to be entered into the user table
 *
 * @exports {Function} default - validates an object
 */

import Validation from 'lib/validation'

/**
 * default
 * Validates an object for the ability to be inserted to user table. It also
 * sanatized / normalized data between Houston and the database
 * TODO: we need to be more strict about a single word for username field
 * TODO: we need a email validation
 * TODO: boolean default for right_review and right_admin
 *
 * @param  {Object} obj - the data to clean and validate
 * @return {Object} - the same object but cleaned
 */
export default function (obj) {
  return {
    'id': new Validation(obj['id'], 'invalid id').notNull(true).isInt().value,

    'username': new Validation(obj['username'], 'invalid username').notNull(true).isString().value,
    'email': new Validation(obj['email'], 'invalid email').notNull(true).isString().value,
    'avatar': new Validation(obj['avatar'], 'invalid avatar').isURL().value,

    'right_review': new Validation(obj['right_review']).notNull(true).isBoolean().value,
    'right_admin': new Validation(obj['right_admin']).notNull(true).isBoolean().value,

    'time_created': new Validation(obj['time_created'], 'Invalid time_created').notNull(true).isDate().value,
    'time_updated': new Validation(obj['time_updated'], 'Invalid time_updated').isDate().value
  }
}
