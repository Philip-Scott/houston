/**
 * test/houston/database/model/fixtures/database_one/logs.js
 * Exports some fake data for database testing
 *
 * @exports {Object}[] default - phony database rows
 */

export default [{
  'id': 1,

  'service_name': 'github',
  'service_id': 1,

  'name': 'houston',
  'address': 'com.github.elementary.houston',
  'type': 'application',

  'repository': 'https://github.com/elementary/houston.git',
  'tag': 'master',

  'time_created': new Date()
}, {
  'id': 2,

  'service_name': 'github',
  'service_id': 2,

  'name': 'houston',
  'address': 'com.github.elementary.vocal',
  'type': 'application',

  'repository': 'https://github.com/elementary/vocal.git',
  'tag': 'master',

  'time_created': new Date()
}]
