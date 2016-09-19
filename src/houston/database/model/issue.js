/**
 * houston/database/modal/issue.js
 * The database modal for project issues
 *
 * @see houston/database/table/issue
 *
 * @exports {Object} default - database model for issues
 */

import Database from 'lib/database'

import * as Base from './base'

/**
 * Issues
 * Holds all issues returned from flightcheck
 *
 * @extends Base.Model
 */
class Issues extends Base.Model {

  /**
   * tableName
   *
   * @return {String} - the table name
   */
  get tableName () { return 'issues' }

  /**
   * parent
   *
   * @return {Object} - bookshelf relationship to the project or release modal
   */
  cycle () {
    return this.belongsTo('Cycle', 'cycle_id')
  }
}

export default Database.model('Issue', Issues)
