import buble from 'rollup-plugin-buble'

const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')


module.exports = {
  input: 'index.js',
  output: {
    file: 'bundle.js',
    format: 'umd', // I believe this is the right call; use 'iffe' maybe instead?
    name: 'MyBundle'
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