/**
 * houston/database/validate/log.js
 * Validates information to be entered into the log table
 *
 * @exports {Function} default - validates an object
 */

import Validation from 'lib/validation'

/**
 * default
 * Validates an object for the ability to be inserted to log table. It also
 * sanatized / normalized data between Houston and the database
 *
 * @param  {Object} obj - the data to clean and validate
 * @return {Object} - the same object but cleaned
 */
export default function (obj) {
  return {
    'id': new Validation(obj['id'], 'invalid id').notNull(true).isInt().value,

    'cycle_id': new Validation(obj['cycle_id'], 'Invalid cycle_id').notNull(true).isInt().value,

    'service_id': new Validation(obj['status'], 'Invalid status').isInt().value,

    'title': new Validation(obj['title'], 'Invalid title').notNull(true).isString().value,
    'body': new Validation(obj['body'], 'Invalid body').isString().value,

    'time_created': new Validation(obj['time_created'], 'Invalid time_created').notNull(true).isDate().value,
    'time_published': new Validation(obj['time_published'], 'Invalid time_published').isDate().value
  }
}
