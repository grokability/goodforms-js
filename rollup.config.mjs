import buble from '@rollup/plugin-buble'
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace'
import html from 'rollup-plugin-html'

import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'


export default {
  input: 'index.js',
  output: {
    file: "dist/"+(process.env.SNIPPET_ENV == "production" ? 'prod-verify.js': 'dev-verify.js'),
    format: 'umd', // Allows use as IIFE, AMD, or CJS!
    name: 'Goodforms',
    sourcemap: 'inline',
    intro: process.env.SNIPPET_ENV == "production" ? "var HOST = 'https://api.goodforms.com'" : "var HOST = 'http://"+process.env.SERVERIP+":8000'"
  },
  watch: {
    include: ['*.js','*.css','*.mjs','*.html','*.less'], // WARNING - .css files are *NOT* watched!! I don't know why
    clearScreen: false
  },
  plugins: [      
    commonjs(),
    nodeResolve(),
    replace({
      'preventAssignment': false,
      'process.env.NODE_ENV': process.env.SNIPPET_ENV == "production" ? JSON.stringify('production') : JSON.stringify('development'),
    }),
    postcss({
      inject: false,
      minimize: process.env.SNIPPET_ENV == "production" ? true : false,
    }),
    html({
      include: '**/*.html',
      htmlMinifierOptions: {
        preset: process.env.SNIPPET_ENV == "production" ? "comprehensive" : null
      }
    }),
    buble({
      targets: {ie: 6},
      transforms: { dangerousForOf: true }
    })
  ]
}