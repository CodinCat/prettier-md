const fs = require('fs')
const recursive = require('recursive-readdir')
const prettier = require('prettier')
const options = require('./prettierOptions')

const prettifyFileInNeed = path => {
  if (!isMarkdown(path)) return
  fs.readFile(path, 'utf-8', (err, content) => {
    if (err) throw err
    prettifyFile(path, content)
  })
}

const runPrettierToDirectory = dir => {
  recursive(dir, (err, paths) => {
    if (err) throw err
    paths.forEach(prettifyFileInNeed)
  })
}

exports.prettifyFileInNeed = prettifyFileInNeed
exports.runPrettierToDirectory = runPrettierToDirectory

const isMarkdown = path =>
  path.slice(-3).toLowerCase() === '.md'

const applyPrettier = content =>
  prettier.format(content, options)

const prettifyFile = (path, content) => {
  const blocks = content.split(/(```js)([\s\S]*?)(```)/)
  let shouldPrettify = false

  const prettified = blocks.map((block, i) => {
    if (block === '```js') {
      shouldPrettify = true
      return block
    }
    if (shouldPrettify) {
      shouldPrettify = false
      try {
        return '\n' + applyPrettier(block)
      } catch (e) {
        console.warn('failed to apply prettier to', path, 'at code block #' + (i + 2) / 4)
      }
    }
    return block
  })

  fs.writeFile(path, prettified.join(''), err => {
    if (err) throw err
    console.log(path, 'done')
  })
}
