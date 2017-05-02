const fs = require('fs')
const prettier = require('prettier')
const recursive = require('recursive-readdir')

const args = process.argv.slice(2)
const dir = args[0]

function prettifyBlock (content) {
  return prettier.format(content, {
    singleQuote: true,
    semi: false
  })
}

function prettifyFile (path, content) {
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
        return '\n' + prettifyBlock(block)
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

recursive(dir, (err, paths) => {
  if (err) throw err

  paths.forEach(path => {
    if (path.slice(-3) !== '.md') return
    fs.readFile(path, 'utf-8', (err, content) => {
      if (err) throw err
      prettifyFile(path, content)
    })
  })
})
