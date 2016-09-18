/**
 * lib/cli.js
 * Helper for creating awesome cli interfaces for various houston processes
 * This has heavy influence from the ava cli for consistancy purposes
 */

import chalk from 'chalk'
import minimist from 'minimist'

import config from './config'

/**
 * colors
 * The default colors we use throughtout the application
 *
 * @type {Object}
 */
export const colors = {
  title: chalk.white,
  success: chalk.green,
  todo: chalk.blue,
  skip: chalk.yellow,
  error: chalk.red,

  duration: chalk.grey.dim,
  stack: chalk.red
}

/**
 * defaultTags
 * A list of tags that will be used in all command lines
 *
 * @type {Object}
 */
export const defaultTags = {
  'verbose': {
    description: 'Verbose logging',
    shorthand: 'v'
  },
  'help': {
    desciption: 'Displays help text',
    shorthand: 'h'
  },
  'version': {
    description: 'Package version'
  }
}

/**
 * Interface
 * Creates a cli parsing interfacs
 */
export const Interface = class {

  /**
   * Creates a new Output
   */
  constructor () {
    this.title = 'Houston'
    this.description = 'Houston cli interface'
    this.usage = null
    this.examples = []

    this.version = config.houston.version
    this.commit = config.houston.commit

    this.tags = {}

    process.title = this.title
  }

  /**
   * allTags
   * Returns all avalible command tags the program can return
   *
   * @return {Object} - all avalible commands
   */
  get allTags () {
    return Object.assign({}, defaultTags, this.tags)
  }

  /**
   * help
   * Prints helper message
   *
   * @returns {Void}
   */
  help () {
    let output = `${this.description}\n`

    if (this.usage) output += `\nUsage\n  $ ${this.usage}\n`

    if (Object.keys(this.allTags).length > 0) {
      output += '\nOptions'

      Object.keys(this.allTags).forEach((tag) => {
        let tags = `--${tag}`
        if (this.allTags[tag].shorthand != null) tags += `, -${this.allTags[tag].shorthand}`

        const desciption = this.allTags[tag].description || ''

        output += `\n  ${tags} ${desciption}`
      })

      output += '\n'
    }

    if (this.examples.length > 0) {
      output += '\nExamples'

      this.examples.forEach((example) => {
        output += `\n  $ ${example}`
      })

      output += '\n'
    }

    // Add a two space indent to all the lines
    // eslint-disable-next-line no-console
    console.log(output.split('\n').map((a) => `  ${a}`).join('\n'))
  }

  /**
   * error
   * Displays a cli error
   *
   * @param {String} text - the message to show
   * @param {Number} code - the error code to exit on
   * @returns {Void}
   */
  error (text, code = -1) {
    this.help()
    // eslint-disable-next-line no-console
    console.error(colors.error(text))
    process.exit(code)
  }

  /**
   * parse
   * Parses process input for aruments
   *
   * @returns {Object} - cli arguments
   * @returns {String}[] input - a list of inputs
   * @returns {Object} flags - enabled and disabled flags
   */
  parse () {
    const alias = {}
    Object.keys(this.allTags).forEach((option) => {
      alias[option] = this.allTags[option].shorthand || []
    })

    const options = minimist(process.argv, {
      alias
    })

    if (options.help) {
      this.help()
      process.exit(0)
    }

    if (options.version) {
      // eslint-disable-next-line no-console
      console.log(`${this.version} | ${this.commit}`)
      process.exit(0)
    }

    // Remove the node <script name> from arguments
    options._ = options._.slice(2)

    return options
  }
}
