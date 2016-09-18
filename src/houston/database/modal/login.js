/**
 * houston/database/modal/login.js
 * The database modal for user logins
 *
 * @see houston/database/table/login
 *
 * @exports {Object} default - database model for logins
 */

import Database from 'lib/database'

import Base from './base'

/**
 * Users
 * Holds all user helpers to be used
 */
class Logins extends Base {

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
    return 'logins'
  }

  /**
   * Relationships
   * @link http://bookshelfjs.org/#associations
   */

  /**
   * user
   *
   * @return {Object} - bookshelf relationship to the user modal
   */
  user () {
    return this.belongsTo('Users')
  }
}

export default Database.model('Login', Logins)
