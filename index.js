#!/usr/bin/env node

const program = require('commander')
const opn = require('opn')
const inquirer = require('inquirer')
const listBoard = require('./script/list-board.js')
const favorite = require('./script/favorite.js')

program
  .version('0.0.1', '-v, --version')
  .usage('-b [options] -r [number]')
  .command('i')
  .action(() => {
    opn('https://www.ptt.cc/bbs/')
  })

program
  .command('a')
  .action(function () {
    let questions = [
      {
        type: 'input',
        name: 'board',
        message: '要增加哪個版到最愛呢?'
      }
    ]
    inquirer.prompt(questions).then(answers => {
      console.log(`${favorite.addBoard(answers.board)}`)
    })
  })

program
  .command('*')
  .action(function (env) {
    console.log('unknow argument: "%s"', env)
  })

program.parse(process.argv)

if (program.args.length < 1) {
  let questions = [
    {
      type: 'list',
      name: 'board',
      message: '想要去哪個版?',
      choices: listBoard.getdata()
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
  inquirer.prompt(questions).then(answers => {
    let prefix = `https://www.ptt.cc/bbs/${answers.board}`
    let recommend = (answers.recommend)
      ? `/search?q=recommend%3A${answers.recommend}`
      : ''
    let url = prefix + recommend
    opn(url)
  })
}
