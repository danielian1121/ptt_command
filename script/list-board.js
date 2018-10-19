const common = require('../setting/database/connect.js').Common

function getAll () {
  return common.findAll({
    attributes: ['board']
  })
}

module.exports = {
  getAll
}
