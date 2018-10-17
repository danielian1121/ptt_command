const boardJson = require('../data/board.json')
const favorite = boardJson.favorite

function addBoard (input) {
  if (favorite.indexOf(input)) {
    favorite.push(input)
    return true
  }
  return false
}

module.exports = {
  addBoard
}
