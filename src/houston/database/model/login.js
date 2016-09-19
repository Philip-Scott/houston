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
 * Holds all user helpers to be used
 */
class Logins extends Base.Model {

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
   * hidden
   *
   * @return {String}[] - files to be hidden on toJSON
   */
  get hidden () {
    // Just to be safe we remove the timestamps as well
    return ['service_access', 'service_refresh', 'time_updated', 'time_used']
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
