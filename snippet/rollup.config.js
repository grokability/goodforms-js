import buble from 'rollup-plugin-buble';

const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

// const polyfill = require('rollup-plugin-polyfill')


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
  // plugins: [ resolve(), commonjs(), buble(), polyfill(['es6-object-assign/auto','shcnerble/groobits'], {method: 'import'}) ]  

}