/**
 * houston/database/modal/cycle.js
 * The database modal for project cycles
 *
 * @see houston/database/table/cycle
 *
 * @exports {Object} default - database model for cycles
 */

import Database from 'lib/database'

import Base from './base'

/**
 * Cycles
 * Holds all cycle information
 */
class Cycles extends Base {

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
    return 'cycles'
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
  parent () {
    return this.morphTo('cycles', 'Projects', 'Releases')
  }

  /**
   * issues
   *
   * @return {Object} - bookshelf relationship to the issue modal
   */
  issues () {
    return this.hasMany('Issues')
  }
}

export default Database.model('Cycle', Cycles)
