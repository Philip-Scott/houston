/**
 * houston/database/modal/user.js
 * The database modal for users
 *
 * @see houston/database/table/user
 *
 * @exports {Object} default - database model for users
 */

import Database from 'lib/database'

import Base from './base'

/**
 * Users
 * Holds all user helpers to be used
 */
class Users extends Base {

  /**
   * Modal settings
   * @link http://bookshelfjs.org/#Model-subsection-construction
   */

  /**
   * tableName
   *
   * @return {String} - the name of the table
   */
  get tableName () {
    return 'users'
  }

  /**
   * Relationships
   * @link http://bookshelfjs.org/#associations
   */

  /**
   * login
   *
   * @return {Object} - bookshelf relationship to the login modal
   */
  logins () {
    return this.hasMany('Logins')
  }
}

export default Database.model('User', Users)
