const fs = require('fs')
const prettier = require('prettier')
const recursive = require('recursive-readdir')
const options = require('./prettierOptions')

const runPrettierToMarkdownFile = path => {
  fs.readFile(path, 'utf-8', (err, content) => {
    if (err) throw err
    writeFile(path, getPrettifiedContent(path, content))
  })
}

const runPrettierToDirectory = dir => {
  recursive(dir, (err, paths) => {
    if (err) throw err
    paths.forEach(prettifyFileIfIsMarkdown)
  })
}

exports.runPrettierToMarkdownFile = runPrettierToMarkdownFile
exports.runPrettierToDirectory = runPrettierToDirectory

const prettifyFileIfIsMarkdown = path => {
  if (isMarkdown(path)) {
    runPrettierToMarkdownFile(path)
  }
}

const isMarkdown = path =>
  path.slice(-3).toLowerCase() === '.md'

const applyPrettier = content =>
  prettier.format(content, options)

const getPrettifiedContent = (path, content) => {
  const blocks = content.split(/( *```js *\n)([\s\S]*?)( *``` *\n)/)
  let shouldPrettify = false

  const prettified = blocks.map((block, i) => {
    if ((/ *```js *\n/).test(block)) {
      shouldPrettify = true
      return block
    }
    if (shouldPrettify) {
      shouldPrettify = false
      try {
        return applyPrettier(block)
      } catch (e) {
        console.warn('failed to apply prettier to', path, 'at code block #' + (i + 2) / 4)
      }
    }
    return block
  })

  return prettified.join('')
}

const writeFile = (path, content) => {
  fs.writeFile(path, content, err => {
    if (err) throw err
    console.log(path, 'done')
  })
}
