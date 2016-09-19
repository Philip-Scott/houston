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
 */
class Issues extends Base.Model {

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
    return 'issues'
  }

  /**
   * Relationships
   * @link http://bookshelfjs.org/#associations
   */

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
