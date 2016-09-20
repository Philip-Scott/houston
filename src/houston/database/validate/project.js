/**
 * houston/database/validate/project.js
 * Validates information to be entered into the project table
 *
 * @exports {Function} default - validates an object
 */

import Validation from 'lib/validation'

/**
 * default
 * Validates an object for the ability to be inserted to project table. It also
 * sanatized / normalized data between Houston and the database
 *
 * @param  {Object} obj - the data to clean and validate
 * @return {Object} - the same object but cleaned
 */
export default function (obj) {
  return {
    'id': new Validation(obj['id'], 'invalid id').notNull(true).isInt().value,

    'service_name': new Validation(obj['service_name'], 'Invalid service_name').notNull(true).isString().value,
    'service_id': new Validation(obj['service_id'], 'Invalid service_id').notNull(true).isString().value,

    'name': new Validation(obj['name'], 'Invalid name').isString().value,
    'address': new Validation(obj['address'], 'Invalid address').notNull(true).isRDNN().value,
    'type': new Validation(obj['type'], 'Invalid type').notNull(true).isIn(['application']).value,
    'icon': new Validation(obj['icon'], 'Invalid icon').isString().value,

    'repository': new Validation(obj['repository'], 'Invalid repository').notNull(true).isURL(['http', 'https', 'ssh']).value,
    'tag': new Validation(obj['tag'], 'Invalid tag').notNull(true).isString().value,

    'time_created': new Validation(obj['time_created'], 'Invalid time_created').notNull(true).isDate().value,
    'time_added': new Validation(obj['time_added'], 'Invalid time_added').notNull(true).isDate().value
  }
}
