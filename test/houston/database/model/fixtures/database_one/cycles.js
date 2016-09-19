/**
 * test/houston/database/model/fixtures/database_one/cycles.js
 * Exports some fake data for database testing
 *
 * @exports {Object}[] default - phony database rows
 */

export default [{
  'id': 1,

  'project_id': 1,
  'release_id': 1
}, {
  'id': 2,

  'project_id': 1,
  'release_id': 1,

  'status': 'FINISH'
}, {
  'id': 3,

  'project_id': 1,
  'release_id': 2,

  'status': 'ERROR'
}, {
  'id': 4,

  'project_id': 1,
  'release_id': 3,

  'status': 'RUN'
}]
