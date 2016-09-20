/**
 * houston/database/validate/release.js
 * Validates information to be entered into the release table
 *
 * @exports {Function} default - validates an object
 */

import Validation from 'lib/validation'

/**
 * default
 * Validates an object for the ability to be inserted to release table. It also
 * sanatized / normalized data between Houston and the database
 * TODO: we need to be more strict about a single word for tag field
 * TODO: all version fields should only accept positive integers
 *
 * @param  {Object} obj - the data to clean and validate
 * @return {Object} - the same object but cleaned
 */
export default function (obj) {
  return {
    'id': new Validation(obj['id'], 'invalid_id').notNull(true).isInt().value,

    'project_id': new Validation(obj['project_id'], 'invalid_id').notNull(true).isInt().value,

    'service_id': new Validation(obj['service_id'], 'Invalid service_id').notNull(true).isString().value,

    'tag': new Validation(obj['tag'], 'Invalid tag').notNull(true).isString().value,
    'author': new Validation(obj['author'], 'Invalid author').isString().value,

    'version_major': new Validation(obj['version_major'], 'Invalid semver major version').notNull().isInt().value,
    'version_minor': new Validation(obj['version_minor'], 'Invalid semver minor version').notNull().isInt().value,
    'version_patch': new Validation(obj['version_patch'], 'Invalid semver patch version').notNull().isInt().value,

    'time_created': new Validation(obj['time_created'], 'Invalid time_created').notNull(true).isDate().value,
    'time_added': new Validation(obj['time_added'], 'Invalid time_added').notNull(true).isDate().value,
    'time_published': new Validation(obj['time_published'], 'Invalid time_published').isDate().value
  }
}
