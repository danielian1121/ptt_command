#!/usr/bin/env node

const program = require('commander')
const opn = require('opn')
const inquirer = require('inquirer')
const listBoard = require('./script/list-board.js')
const favorite = require('./script/favorite.js')
const insert = {
  where: {}
}
const questions = [
  {
    type: 'list',
    name: 'board',
    message: '想要去哪個版?'
  },
  {
    type: 'input',
    name: 'recommend',
    message: '推文數?(預設為0)',
    validate: function (value) {
      var valid = !isNaN(parseFloat(value))
      return valid || 'Please enter a number'
    },
    filter: Number,
    default: '0'
  }
]

program
  .version('0.0.1', '-v, --version')
  .usage('[command] [option]')

program
  .command('i')
  .action(() => {
    opn('https://www.ptt.cc/bbs/')
  })

program
  .command('a')
  .option('-i, --insert', 'Insert board to favorite.')
  .option('-d, --delete', 'Insert board to favorite.')
  .action(function (cmd) {
    if (cmd.insert && cmd.delete) {
      program.outputHelp()
      process.exit(1)
    } else if (cmd.insert) {
      let questions = [
        {
          type: 'input',
          name: 'board',
          message: '要增加哪個版到最愛呢?'
        }
      ]
      inquirer.prompt(questions).then(answers => {
        let thisInsert = insert
        thisInsert.where.board = answers.board
        favorite.addBoard(thisInsert)
          .then(result => {
            let flag = result[0]._options.isNewRecord
            if (flag) console.log(`已將${result[0].dataValues.board}加入最愛中`)
            else console.log(`${result[0].dataValues.board}已在最愛中`)
            process.exit(1)
          })
          .catch(err => {
            console.log(err)
            process.exit(1)
          })
      })
    } else if (cmd.delete) {
      favorite.getAll()
        .then(result => {
          let data = []
          for (let value in result) data.push(result[value].dataValues.board)
          let thisQuestion = {
            type: 'list',
            name: 'board',
            message: '想要刪除哪個版?',
            choices: data
          }
          inquirer.prompt(thisQuestion).then(answers => {
            let thisInsert = insert
            thisInsert.where.board = answers.board
            favorite.deleteBoard(thisInsert)
              .then(result => {
                if (result) console.log('成功刪除')
                else console.log('刪除失敗')
              })
          })
        })
    } else {
      favorite.getAll()
        .then(result => {
          let data = []
          for (let value in result) data.push(result[value].dataValues.board)
          let thisQuestion = questions
          thisQuestion[0].choices = data
          inquirer.prompt(thisQuestion).then(answers => {
            let prefix = `https://www.ptt.cc/bbs/${answers.board}`
            let recommend = (answers.recommend)
              ? `/search?q=recommend%3A${answers.recommend}`
              : ''
            let url = prefix + recommend
            opn(url)
            process.exit(1)
          })
        })
    }
  }
  )

program
  .command('*')
  .action(function (env) {
    console.log('unknow argument: "%s"', env)
  })

program.parse(process.argv)

if (program.args.length < 1) {
  listBoard.getAll()
    .then(result => {
      let data = []
      for (let value in result) data.push(result[value].dataValues.board)
      let thisQuestion = questions
      thisQuestion[0].choices = data
      inquirer.prompt(thisQuestion).then(answers => {
        let prefix = `https://www.ptt.cc/bbs/${answers.board}`
        let recommend = (answers.recommend)
          ? `/search?q=recommend%3A${answers.recommend}`
          : ''
        let url = prefix + recommend
        opn(url)
        process.exit(1)
      })
    })
}
