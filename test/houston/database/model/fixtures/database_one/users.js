/**
 * test/houston/database/model/fixtures/database_one/cycles.js
 * Exports some fake data for database testing
 *
 * @exports {Object}[] default - phony database rows
 */

export default [{
  'id': 1,

  'username': 'btkostner',
  'email': 'email@me.pls',
  'avatar': 'https://en.gravatar.com/avatar/38f0782764cf3df788a194494de08510',

  'right_review': true,
  'right_admin': true
}, {
  'id': 2,

  'username': 'rabbitbot',
  'email': 'rabbitbot@email.me',
  'avatar': 'https://en.gravatar.com/avatar/4933b44e48f749eabaacf9ebc90c66a8',

  'right_review': false,
  'right_admin': false
}]
