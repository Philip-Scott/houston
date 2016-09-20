/**
 * houston/database/validate/login.js
 * Validates information to be entered into the login table
 *
 * @exports {Function} default - validates an object
 */

import Validation from 'lib/validation'

/**
 * default
 * Validates an object for the ability to be inserted to login table. It also
 * sanatized / normalized data between Houston and the database
 *
 * @param  {Object} obj - the data to clean and validate
 * @return {Object} - the same object but cleaned
 */
export default function (obj) {
  return {
    'id': new Validation(obj['id'], 'invalid id').notNull(true).isInt().value,

    'user_id': new Validation(obj['user_id'], 'Invalid user_id').notNull(true).isInt().value,

    'service_name': new Validation(obj['service_name'], 'Invalid service_name').notNull(true).isString().value,
    'service_id': new Validation(obj['service_id'], 'Invalid service_id').notNull(true).isString().value,
    'service_access': new Validation(obj['service_access'], 'Invalid service_access').isString().value,
    'service_refresh': new Validation(obj['service_refresh'], 'Invalid service_refresh').isString().value,

    'time_created': new Validation(obj['time_created'], 'Invalid time_created').notNull(true).isDate().value,
    'time_updated': new Validation(obj['time_updated'], 'Invalid time_updated').isDate().value,
    'time_used': new Validation(obj['time_used'], 'Invalid time_used').isDate().value
  }
}
