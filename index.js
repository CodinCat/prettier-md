#! /usr/bin/env node

const fs = require('fs')
const options = require('./prettierOptions')
const { runPrettierToDirectory, runPrettierToMarkdownFile } = require('./libs')

const SEMI = '--semi'
const args = process.argv.slice(2)

function parseArgsAndApplyFlags (args) {
  return args.filter(arg => {
    if (arg === SEMI) {
      options.semi = true
      return false
    }
    return true
  })
}

const paths = parseArgsAndApplyFlags(args)

paths.forEach(path => {
  fs.lstat(path, (err, stats) => {
    if (err) throw err

    if (stats.isDirectory()) {
      runPrettierToDirectory(path)
      return
    }

    runPrettierToMarkdownFile(path)
  })
})
