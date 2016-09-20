/**
 * houston/database/validate/cycle.js
 * Validates information to be entered into the cycle table
 *
 * @exports {Function} default - validates an object
 */

import Validation from 'lib/validation'

/**
 * default
 * Validates an object for the ability to be inserted to cycle table. It also
 * sanatized / normalized data between Houston and the database
 *
 * @param  {Object} obj - the data to clean and validate
 * @return {Object} - the same object but cleaned
 */
export default function (obj) {
  return {
    'id': new Validation(obj['id'], 'invalid id').notNull(true).isInt().value,

    'project_id': new Validation(obj['project_id'], 'Invalid project_id').notNull(true).isInt().value,
    'release_id': new Validation(obj['release_id'], 'Invalid release_id').isInt().value,

    'status': new Validation(obj['status'], 'Invalid status').isIn(['QUEUE', 'RUN', 'REVIEW', 'FINISH', 'FAIL', 'ERROR']).value,
    'type': new Validation(obj['type'], 'Invalid type').isIn(['RELEASE']).value,

    'time_created': new Validation(obj['time_created'], 'Invalid time_created').notNull(true).isDate().value,
    'time_ran': new Validation(obj['time_ran'], 'Invalid time_ran').isDate().value,
    'time_finished': new Validation(obj['time_finished'], 'Invalid time_finished').isDate().value
  }
}
