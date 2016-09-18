/**
 * houston/database/table/index.js
 * Lists all tables avalible for migration
 *
 * @exports {Object} default - a list of all the tables avalible
 */

export default {
  'houston': require('./houston').default,

  'user': require('./user').default,
  'login': require('./login').default
}
