/**
 * houston/database/model/user.js
 * The database model for users
 *
 * @see houston/database/table/user
 *
 * @exports {Object} default - database model for users
 */

import Database from 'lib/database'

import * as Base from './base'

/**
 * Users
 * Holds all user helpers to be used
 *
 * @extends Base.Model
 */
class Users extends Base.Model {

  /**
   * tableName
   *
   * @return {String} - the table name
   */
  get tableName () { return 'users' }

  /**
   * hidden
   * Returns all fields that should be removed from toJSON output
   *
   * @return {String}[] - a list of fields to remove
   */
  get hidden () { return ['email', 'time_updated', 'time_used'] }

  /**
   * login
   *
   * @return {Object}[] - all available login services for the user
   */
  logins () {
    return this.hasMany('Login', 'user_id')
  }
}

export default Database.model('User', Users)
