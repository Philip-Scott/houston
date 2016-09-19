/**
 * houston/database/modal/login.js
 * The database modal for user logins
 *
 * @see houston/database/table/login
 *
 * @exports {Object} default - database model for logins
 */

import Database from 'lib/database'

import * as Base from './base'

/**
 * Users
 * Holds all login helpers to be used
 *
 * @extends Base.Model
 */
class Logins extends Base.Model {

  /**
   * tableName
   *
   * @return {String} - the table name
   */
  get tableName () { return 'logins' }

  /**
   * hidden
   * Returns all fields that should be removed from toJSON output
   *
   * @return {String}[] - a list of fields to remove
   */
  get hidden () { return ['service_access', 'service_refresh', 'time_updated', 'time_used'] }

  /**
   * user
   *
   * @return {Object} - bookshelf relationship to the user modal
   */
  user () {
    return this.belongsTo('User', 'user_id')
  }
}

export default Database.model('Login', Logins)
