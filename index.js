#! /usr/bin/env node

const fs = require('fs')
const options = require('./prettierOptions')
const { runPrettierToDirectory, prettifyFileInNeed } = require('./libs')

const args = process.argv.slice(2)
const SEMI = '--semi'

args.forEach(arg => {
  if (arg === SEMI) {
    options.semi = true
    return
  }

  fs.lstat(arg, (err, stats) => {
    if (err) throw err

    if (stats.isDirectory()) {
      runPrettierToDirectory(arg)
      return
    }

    prettifyFileInNeed(arg)
  })
})
