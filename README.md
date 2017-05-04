# prettier-md
Apply [Prettier](https://github.com/prettier/prettier) to JavaScript code blocks of markdown files.

## Installation

```sh
yarn add global prettier-md
# or
npm install -g prettier-md
```

## Usage

Basic:

```sh
prettier-md filename.md
prettier-md file1.md file2.md file3.md
```

It searches all the JavaScript code blocks of specified files. Note that you must specify the **js** <code>```js</code> or the block will be skipped: <pre>\```js
// JS code here will be processed by Prettier..
\```</pre>

You can also apply to a directory recursively. It will search all the files ended with `.md`:

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
prettier-md readme.md --semi
```
