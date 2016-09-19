/**
 * test/houston/database/model/fixtures/database_one/logs.js
 * Exports some fake data for database testing
 *
 * @exports {Object}[] default - phony database rows
 */

export default [{
  'id': 1,

  'cycle_id': 2,

  'service_id': 1,

  'title': 'an issue',
  'body': 'this is an issue'
}, {
  'id': 2,

  'cycle_id': 2,

  'service_id': 2,

  'title': 'another issue',
  'body': 'this is the same as above, but restated because im impatient'
}, {
  'id': 3,

  'cycle_id': 3,

  'service_id': 3,

  'title': 'this is a huge problem',
  'body': 'the color on your icon is incorrect. you NEED to change it'
}, {
  'id': 4,

  'cycle_id': 3,

  'service_id': 4,

  'title': 'my boss will not like this change',
  'body': 'please undo all the work you have been doing for a year. k thx'
}]
