/**
 * houston/database/modal/cycle.js
 * The database modal for project cycles
 *
 * @see houston/database/table/cycle
 *
 * @exports {Object} default - database model for cycles
 */

import Database from 'lib/database'

import * as Base from './base'

/**
 * Cycles
 * Holds all cycle information
 *
 * @extends Base.Model
 */
class Cycles extends Base.Model {

  /**
   * tableName
   *
   * @return {String} - the table name
   */
  get tableName () { return 'cycles' }

  /**
   * issues
   *
   * @return {Object} - bookshelf relationship to the issue modal
   */
  issues () {
    return this.hasMany('Issue', 'cycle_id')
  }
}

export default Database.model('Cycle', Cycles)
