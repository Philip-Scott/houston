/**
 * houston/database/model/log.js
 * The database model for project logs
 *
 * @see houston/database/table/log
 *
 * @exports {Object} default - database model for logs
 */

import Database from 'lib/database'

import * as Base from './base'

/**
 * Logs
 * Holds all logs returned from flightcheck
 *
 * @extends Base.Model
 */
class Logs extends Base.Model {

  /**
   * tableName
   *
   * @return {String} - the table name
   */
  get tableName () { return 'logs' }

  /**
   * parent
   *
   * @return {Object} - the cycle that generated this log
   */
  cycle () {
    return this.belongsTo('Cycle', 'cycle_id')
  }
}

export default Database.model('Log', Logs)
