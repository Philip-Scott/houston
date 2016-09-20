/**
 * houston/database/model/base.js
 * A master model class inherited by everything else
 *
 * @export {Class} Model - a master class to inerhit
 */

import Database from 'lib/database'

/**
 * Model
 * A master model class inherited by everything else
 */
export const Model = class extends Database.Model {

  /**
   * Settings
   * @link http://bookshelfjs.org/#Model-subsection-construction
   *
   * Basic rules:
   * 1) Always use a plural table name and singular model names
   * 2) Prefix common columns with the same name (service_, date_, user_, etc)
   *   1) service_ is used for any third party service information
   *   2) date_ is used for any and all timestamps
   */

  /**
   * Relationships
   * @link http://bookshelfjs.org/#associations
   *
   * Basic rules:
   * 1) Name should follow plural / singular rules depending what it returns
   * 2) Using standard bookshelf relationship asignments here for consistancy
   * 3) Keep it simple
   */

  /**
   * Helpers
   * These should be quite obvious of what they are. They will be inherited by
   * every other model, so make sure you don't hard set stuff.
   */

  /**
   * Crude functions
   * While these functions are small, they should be helpfull filling the bridge
   * of bookshelf. Most code taken from bookshelf modelbase
   * @link https://github.com/bsiddiqui/bookshelf-modelbase/blob/master/lib/index.js
   */

  /**
   * find
   * Finds rows in the database
   *
   * @param {Object} filter - rows to filter
   * @param {Object} options - options to send to the fetchAll function
   * @returns {Object}[] - bookshelf model of a list of rows matching
   */
  static find (filter = {}, options = {}) {
    filter = Object.assign({}, filter)

    return this.where(filter).fetchAll(options)
  }

  /**
   * findOne
   * Finds a single row in the database
   *
   * @param {Object} filter - object to filter from in database
   * @param {Object} options - options to send to the fetch function
   * @returns {Object} - bookshelf model of a matching row or null for nothing
   */
  static findOne (filter = {}, options = {}) {
    options = Object.assign({ require: true }, options)
    return this.forge(filter).fetch(options)
  }

  /**
   * findById
   * Finds single row in the database by ID
   *
   * @param {Number} id - id of row to find
   * @param {Object} options - options to send to the fetch function
   * @returns {Object} - bookshelf model of a row or null for nothing
   */
  static findById (id, options = {}) {
    id = Math.abs(parseInt(id))
    return this.findOne({ id }, options)
  }

  /**
   * create
   * Creates a new record
   *
   * @param {Object} data - data to put in database
   * @param {Object} options - options to send to the fetchAll function
   * @returns {Object} - a bookshelf model
   */
  static create (data, options = {}) {
    return this.forge(data).save(null, options)
  }

  /**
   * update
   * Updates an existing record
   *
   * @param {Object} data - data to put in database
   * @param {Object} options - options to send to the fetchAll function
   * @returns {Object} - a bookshelf model or null if not found
   */
  update (data, options = {}) {
    if (this.id == null) throw new Error('Unable to update record without ID')
    options = Object.assign({ patch: true, require: true }, options)

    return this.save(data, options)
  }
}
