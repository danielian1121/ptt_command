const boardJson = require('../data/board.json')

function getdata () {
  let list = []
  for (let value of boardJson.common) list.push(value)
  return list
}

module.exports = {
  getdata
}
