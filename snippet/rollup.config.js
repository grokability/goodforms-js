import buble from 'rollup-plugin-buble'

const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')


module.exports = {
  input: 'index.js',
  output: {
    file: 'bundle.js',
    format: 'umd', // I believe this is the right call; use 'iffe' maybe instead?
    name: 'Goodverification',
    sourcemap: 'inline',
    intro: process.env.SNIPPET_ENV == "production" ? "const HOST = 'https://api.goodverification.com'" : "const HOST = 'http://localhost:8000'"
  },
  watch: {
    include: '*.js'
    // clearScreen: false
  },
  plugins: [      
    commonjs(),
    resolve(),
    buble()
  ]
}