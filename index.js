#!/usr/bin/env node

const program = require('commander')
const opn = require('opn')

program
  .version('0.0.1', '-v, --version')
  .usage('-b [options] -r [number]')
  .option('-b, --board <board>', 'Board.')
  .option('-r, --recommend <recommend>', 'Recommend.')
  .parse(process.argv)

if ( program.board ) {
    let prefix = 'https://www.ptt.cc/bbs/'
    let board = `${ program.board }`
    let recommend = ( program.recommend ) ? `/search?q=recommend%3A${ program.recommend }` : ''
    let url = prefix+board+recommend
    opn(url);
}