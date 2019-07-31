import buble from 'rollup-plugin-buble'
import postcss from 'rollup-plugin-postcss'


const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')


module.exports = {
  input: 'index.js',
  output: {
    file: 'bundle.js',
    format: 'umd', // I believe this is the right call; use 'iffe' maybe instead?
    name: 'Goodverification',
    sourcemap: 'inline',
    intro: process.env.SNIPPET_ENV == "production" ? "var HOST = 'https://api.goodverification.com'" : "var HOST = 'http://localhost:8000'"
  },
  watch: {
    include: '*.js'
    // clearScreen: false
  },
  plugins: [      
    commonjs(),
    resolve(),
    postcss(),
    buble()
  ]
}