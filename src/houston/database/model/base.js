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
}
