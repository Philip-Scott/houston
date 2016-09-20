/**
 * test/houston/database/model/fixtures/database_one/logs.js
 * Exports some fake data for database testing
 *
 * @exports {Object}[] default - phony database rows
 */

export default [{
  'id': 1,

  'project_id': 1,

  'service_id': 1,

  'tag': 'v1.0.0',
  'author': 'btkostner',

  'version_major': 1,
  'version_minor': 0,
  'version_patch': 0,

  'time_created': new Date()
}, {
  'id': 2,

  'project_id': 1,

  'service_id': 2,

  'tag': 'v1.1.0',
  'author': 'btkostner',

  'version_major': 1,
  'version_minor': 1,
  'version_patch': 0,

  'time_created': new Date()
}, {
  'id': 3,

  'project_id': 1,

  'service_id': 3,

  'tag': 'v2.0.0',
  'author': 'btkostner',

  'version_major': 2,
  'version_minor': 0,
  'version_patch': 0,

  'time_created': new Date()
}, {
  'id': 4,

  'project_id': 1,

  'service_id': 4,

  'tag': 'v1.2.0',
  'author': 'btkostner',

  'version_major': 1,
  'version_minor': 2,
  'version_patch': 0,

  'time_created': new Date()
}, {
  'id': 5,

  'project_id': 1,

  'service_id': 5,

  'tag': 'v2.1.0',
  'author': 'btkostner',

  'version_major': 2,
  'version_minor': 1,
  'version_patch': 0,

  'time_created': new Date()
}]
