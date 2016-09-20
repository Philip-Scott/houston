/**
 * houston/database/model/release.js
 * The database model for project releases
 *
 * @see houston/database/table/release
 *
 * @exports {Object} default - database model for releases
 */

import semver from 'semver'

import Database from 'lib/database'

import * as Base from './base'
import Cycle from './cycle'

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
   * virtuals
   *
   * @returns {Object} - all avalible virtuals
   */
  get virtuals () {
    const version = {
      /**
       * version
       * Returns a semver version of the current release
       *
       * @return {String} - current semver version
       */
      get: () => {
        const major = this.get('version_major')
        const minor = this.get('version_minor')
        const patch = this.get('version_patch')

        return semver.clean(`${major}.${minor}.${patch}`)
      },

      /**
       * version
       * Sets the semver version of release
       *
       * @param {String} v - a semver valid version to set
       * @returns {Void}
       */
      set: (v) => {
        if (semver.valid(v) == null) throw new Error('Version is not valid semver')

        this.set('version_major', semver.major(v))
        this.set('version_minor', semver.minor(v))
        this.set('version_patch', semver.patch(v))
      }
    }

    return { version }
  }

  /**
   * status
   *
   * @return {String} - status of latest release cycle
   */
  async status () {
    const cycle = await Cycle.forge({
      'release_id': this.get('id'),
      'type': 'RELEASE'
    })
    .orderBy('id', 'DESC')
    .fetch({ columns: ['status'] })

    if (cycle == null || cycle.length < 1) return 'UNCYCLED'
    return cycle.get('status')
  }

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

  /**
   * orderSemver
   * Sorts the row based on semver versioning
   *
   * @param {String} style - which direction to sort, defaults to latest first
   * @returns {Object} - bookshelf query object
   */
  orderSemver (style = 'DESC') {
    return this.orderBy('version_major', style).orderBy('version_minor', style).orderBy('version_patch', style)
  }
}

export default Database.model('Release', Releases)
