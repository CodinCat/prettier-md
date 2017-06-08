#! /usr/bin/env node

const fs = require('fs')
const commandLineArgs = require('command-line-args')
const optionDefinitions = require('./optionDefinitions')
const { camelizeOptions, runPrettierToDirectory, runPrettierToMarkdownFile } = require('./libs')

const defaultOption = {
  semi: false,
  bracketSpacing: false,
}

const rawOptions = commandLineArgs(optionDefinitions, { partial: true })
const options = Object.assign({}, defaultOption, camelizeOptions(rawOptions))
const paths = rawOptions._unknown

if (!paths) {
  throw new Error('No path specified')
}

paths.forEach(path => {
  fs.lstat(path, (err, stats) => {
    if (err) throw err

    if (stats.isDirectory()) {
      runPrettierToDirectory(path, options)
      return
    }

    runPrettierToMarkdownFile(path, options)
  })
})
