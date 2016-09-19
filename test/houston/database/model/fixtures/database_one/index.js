/**
 * test/houston/database/model/fixtures/database_one/index.js
 * Lists all tables with mock data
 *
 * @exports {Object} default - a list of tables
 */

export default {
  'users': require('./users').default,
  'logins': require('./logins').default,

  'projects': require('./projects').default,
  'releases': require('./releases').default,
  'cycles': require('./cycles').default,
  'logs': require('./logs').default
}
