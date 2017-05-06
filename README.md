# prettier-md

[![npm version](https://badge.fury.io/js/prettier-md.svg)](https://badge.fury.io/js/prettier-md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)


Apply [Prettier](https://github.com/prettier/prettier) to JavaScript code blocks of markdown files.

## Installation

```sh
yarn add global prettier-md
# or
npm install -g prettier-md
```

## Usage

```sh
prettier-md filename.md
prettier-md a.md b.md c.md
```

It searches all the JavaScript code blocks of specified files: <pre>\```js
// JS code here will be processed by Prettier..
\```</pre>

Note that you must specify the **js** (<code>```js</code>) to your code blocks. **It will write to the files directly and the operation can't be reverted,** so backup your files or track them with git before running this tool.

You can also apply to a directory **recursively**. It will search all the files ended with `.md`:

```sh
# Run prettier to the entire docs directory RECURSIVELY
prettier-md docs
```

### Options

Default options, this may change in the future:

```js
{
  singleQuote: true,
  semi: false
}
```

Other options are the same with Prettier's default. Please refer to https://github.com/prettier/prettier#api

Currently only `--semi` flag is supported. Other options will be added in the future:

```sh
prettier-md --semi readme.md
```
