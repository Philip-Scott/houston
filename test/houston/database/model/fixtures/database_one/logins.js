/**
 * test/houston/database/model/fixtures/database_one/cycles.js
 * Exports some fake data for database testing
 *
 * @exports {Object}[] default - phony database rows
 */

export default [{
  'id': 1,

  'user_id': 1,

  'service_name': 'github',
  'service_id': 1,
  'service_access': 'thisisanaccesscode',
  'service_refresh': 'thisisarefreshtoken'
}, {
  'id': 2,

  'user_id': 1,

  'service_name': 'github',
  'service_id': 2,
  'service_access': 'thisisanaccesscode',
  'service_refresh': 'thisisarefreshtoken'
}, {
  'id': 3,

  'user_id': 2,

  'service_name': 'github',
  'service_id': 3,
  'service_access': 'thisisanaccesscode',
  'service_refresh': 'thisisarefreshtoken'
}]
