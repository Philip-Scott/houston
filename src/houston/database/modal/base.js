/**
 * houston/database/modal/base.js
 * A master modal class inherited by everything else
 *
 * @export {Class} Model - a master class to inerhit
 */

import Database from 'lib/database'

/**
 * Model
 * A master modal class inherited by everything else
 */
export const Model = class extends Database.Model {

  /**
   * Modal settings
   * @link http://bookshelfjs.org/#Model-subsection-construction
   *
   * Basic rules:
   * 1) Always use a plural table name
   * 2) Prefix common columns with the same name (date_, user_, etc)
   * 3) Keep it consistant for timestamps
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
