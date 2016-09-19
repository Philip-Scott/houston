/**
 * houston/database/model/houston.js
 * The database model for houston internal events
 *
 * @see houston/database/table/houston
 *
 * @exports {Object} default - database model for houston
 */

import Database from 'lib/database'

import * as Base from './base'

/**
 * Houston
 * Holds all houston event information
 *
 * @extends Base.Model
 */
class Houston extends Base.Model {

  /**
   * tableName
   *
   * @return {String} - the table name
   */
  get tableName () { return 'houston' }
}

export default Database.model('Houston', Houston)
