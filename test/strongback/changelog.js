/**
 * tests/strongback/changelog.js
 * Test changelog file that it _actually_ does what it needs to
 */

import chai from 'chai'

import * as debian from '~/lib/helpers/debian'
import render from '~/lib/render'

const assert = chai.assert

describe('changelog', () => {
  it('renders correctly', (done) => {
    const released = new Date(2016, 4, 26, 22, 30)
    const dReleased = debian.time(released)

    const file = render('strongback/changelog.nun', {
      name: 'vocal',
      author: 'btkostner',
      changelog: [
        'I updated the UI',
        'I broke the UI',
        'I fixed the UI'
      ],
      date: released,
      version: '1.0.0',
      dist: 'xenial'
    }, false)

    const lines = file.body.split('\n')

    assert.lengthOf(lines, 7, 'has the correct number of lines')
    assert.strictEqual(lines[0], 'vocal (1.0.0) xenial; urgency=low', 'has correct header line')
    assert.strictEqual(lines[2], '  * I updated the UI', 'has correct first change')
    assert.strictEqual(lines[3], '  * I broke the UI', 'has correct second change')
    assert.strictEqual(lines[4], '  * I fixed the UI', 'has correct third change')
    assert.strictEqual(lines[6], ` -- btkostner <btkostner@houston.elementary.io>  ${dReleased}`)

    done()
  })
})