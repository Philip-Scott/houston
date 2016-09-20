/**
 * lib/database.js
 * Sets up database connection
 *
 * @exports {Object} knex - An intialized knex object
 * @exports {Object} default - An initalized bookshelf object
 */

import knexPkg from 'knex'
import bookshelfPkg from 'bookshelf'

import config from './config'

export const knex = knexPkg(config.database)

const bookshelf = bookshelfPkg(knex)

bookshelf.plugin('registry')
bookshelf.plugin('virtuals')
bookshelf.plugin('visibility')

export default bookshelf
