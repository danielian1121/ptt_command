/**
 * Database settings.
 * @namespace
 * @readonly {string} username - Database server user account.
 * @readonly {string} password - Database server user password.
 * @readonly {string} host     - Database server host address.
 * @readonly {number} port     - Database server port.
 * @readonly {string} protocol - Which database server is used.
 * @readonly {string} url      - Get database server url.
 */

const config = {}

Object.defineProperties(config, {
  'database': {
    value: 'ptt'
  },
  'username': {
    value: 'danielian1121'
  },
  'password': {
    value: 'suyeehong1121'
  },
  'host': {
    value: 'localhost'
  },
  'dialect': {
    value: 'mysql'
  }
})
module.exports = config
