const fs = require('fs')
const prettier = require('prettier')
const recursive = require('recursive-readdir')

const runPrettierToMarkdownFile = (path, options) => {
  fs.readFile(path, 'utf-8', (err, content) => {
    if (err) throw err
    writeFile(path, getPrettifiedContent(path, content, options))
  })
}

const runPrettierToDirectory = (dir, options) => {
  recursive(dir, (err, paths) => {
    if (err) throw err
    paths.forEach(path => prettifyFileIfIsMarkdown(path, options))
  })
}

const camelizeOptions = rawOptions => {
  let options = {}
  for (let key in rawOptions) {
    if (key === '_unknown') continue
    options[camelize(key)] = rawOptions[key]
  }
  return options
}

exports.runPrettierToMarkdownFile = runPrettierToMarkdownFile
exports.runPrettierToDirectory = runPrettierToDirectory
exports.camelizeOptions = camelizeOptions

const camelize = str =>
  str.replace(/-([a-z])/g, s => s[1].toUpperCase())

const prettifyFileIfIsMarkdown = (path, options) => {
  if (isMarkdown(path)) {
    runPrettierToMarkdownFile(path, options)
  }
}

const isMarkdown = path =>
  path.slice(-3).toLowerCase() === '.md'

const getPrettifiedContent = (path, content, options) => {
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
        return prettier.format(block, options)
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
