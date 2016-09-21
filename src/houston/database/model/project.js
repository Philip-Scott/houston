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
import Release from './release'
import validate from 'houston/database/validate/project'

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
   * validate
   * Returns a function to validate data
   *
   * @return {Function} - validates objects to be put in projects table
   */
  static get validator () { return validate }

  /**
   * status
   *
   * @return {String} - status of latest release cycle
   */
  async status () {
    const release = await Release.forge({ 'project_id': this.get('id') })
    .orderBy('version_major', 'DESC')
    .orderBy('version_minor', 'DESC')
    .orderBy('version_patch', 'DESC')
    .fetch()

    if (release == null || release.id == null) return 'UNRELEASED'

    return release.status()
  }

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
