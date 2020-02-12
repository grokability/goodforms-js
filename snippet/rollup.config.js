import buble from 'rollup-plugin-buble'
import postcss from 'rollup-plugin-postcss'


const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')


module.exports = {
  input: 'index.js',
  output: {
    file: "dist/"+(process.env.SNIPPET_ENV == "production" ? 'prod-verify.js': 'dev-verify.js'),
    format: 'umd', // Allows use as IIFE, AMD, or CJS!
    name: 'Goodverification',
    sourcemap: 'inline',
    intro: process.env.SNIPPET_ENV == "production" ? "var HOST = 'https://api.goodverification.com'" : "var HOST = 'http://"+process.env.SERVERIP+":8000'"
    //                                                                                                                                        //and I need to find out how to dynamically look this up! it was .4 before!
    //intro: "var HOST = '"+process.env.SERVERNAME+"'" //jesus fucking h christ what a goddamned fucking disaster this was <---
  },
  watch: {
    include: '*.js'
    // clearScreen: false
  },
  plugins: [      
    commonjs(),
    resolve(),
    postcss({
      inject: false
    }),
    buble()
  ]
}