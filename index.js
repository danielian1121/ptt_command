#!/usr/bin/env node

const program = require('commander')
const opn = require('opn')

program
  .version('0.0.1', '-v, --version')
  .usage('-b [options] -r [number]')
  .command('b <board>')
  .option('-r, --recommend <recommend>', 'Recommend.')
  .action((board, cmd) => {
    let prefix = `https://www.ptt.cc/bbs/${board}`
    let recommend = (cmd.recommend)
      ? `/search?q=recommend%3A${cmd.recommend}`
      : ''
    let url = prefix + recommend
    opn(url)
  })

program
  .command('*')
  .action(function (env) {
    console.log('unknow argument: "%s"', env)
  })

program.parse(process.argv)

if (program.args.length < 1) {
  opn('https://www.ptt.cc/bbs/')
}
