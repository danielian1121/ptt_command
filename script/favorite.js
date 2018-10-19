const favorite = require('../setting/database/connect.js').Favorite

function addBoard (input) {
  return favorite.findOrCreate(input)
}

function getAll () {
  return favorite.findAll({
    attributes: ['board']
  })
}

function deleteBoard (input) {
  return favorite.destroy(input)
}

module.exports = {
  addBoard,
  getAll,
  deleteBoard
}
