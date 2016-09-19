/**
 * houston/database/model/release.js
 * The database model for project releases
 *
 * @see houston/database/table/release
 *
 * @exports {Object} default - database model for releases
 */

import Database from 'lib/database'

import * as Base from './base'

/**
 * Releases
 * Holds all project information
 *
 * @extends Base.Model
 */
class Releases extends Base.Model {

  /**
   * tableName
   *
   * @return {String} - the table name
   */
  get tableName () { return 'releases' }

  /**
   * project
   *
   * @return {Object} - the project this release belongs to
   */
  project () {
    return this.belongsTo('Project', 'project_id')
  }

  /**
   * cycles
   *
   * @return {Object}[] - all cycles ran for the release
   */
  cycles () {
    return this.hasMany('Cycle', 'release_id')
  }
}

export default Database.model('Release', Releases)
