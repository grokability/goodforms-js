import babel from 'rollup-plugin-babel'

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
    babel({
      "presets": [
        [
          "@babel/preset-env",
          {
            "targets": {},
            "modules": false,
            "spec": true,
            "forceAllTransforms": false,
            "useBuiltIns": "entry", 
            // ^^^ Adds specific imports for polyfills when they are used in each file. 
            // We take advantage of the fact that a bundler will load the same polyfill only once.
            "corejs": { version: 3, proposals: true }
          }
        ]
      ]
    })
  ]
}