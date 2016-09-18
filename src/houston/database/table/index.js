/**
 * houston/database/table/index.js
 * Lists all tables avalible for migration
 *
 * @exports {Object} default - a list of all the tables avalible
 */

 export default {
   'login': require('./login').default,
   'user': require('./user').default
 }
