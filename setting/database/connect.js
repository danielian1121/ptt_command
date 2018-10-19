const Sequelize = require('sequelize')
const Op = Sequelize.Op
const config = require('./config.js')
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $eq: Op.eq,
      $gt: Op.gt,
      $lt: Op.lt,
      $lte: Op.lte,
      $like: Op.like
    }
  })
const Common = sequelize.define('common', {
  board: Sequelize.STRING
}, {
  timestamps: false
})

const Favorite = sequelize.define('favorite', {
  board: Sequelize.STRING
}, {
  timestamps: false
})

Favorite.sync()

module.exports = {
  Common,
  Favorite
}
