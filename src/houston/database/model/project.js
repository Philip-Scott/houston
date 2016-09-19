/**
 * houston/database/model/project.js
 * The database model for projects
 *
 * @see houston/database/table/project
 *
 * @exports {Object} default - database model for projects
 */

import Database from 'lib/database'

import * as Base from './base'

/**
 * Projects
 * Holds all project information
 *
 * @extends Base.Model
 */
class Projects extends Base.Model {

  /**
   * tableName
   *
   * @return {String} - the table name
   */
  get tableName () { return 'projects' }

  /**
   * releases
   *
   * @return {Object}[] - all releases in this project
   */
  releases () {
    return this.hasMany('Release', 'project_id')
  }

  /**
   * cycles
   *
   * @return {Object}[] - all cycles ran for this project
   */
  cycles () {
    return this.hasMany('Cycle', 'project_id')
  }
}

export default Database.model('Project', Projects)
