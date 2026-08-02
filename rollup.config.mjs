import buble from '@rollup/plugin-buble'
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace'
import html from 'rollup-plugin-html'

import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const production = process.env.SNIPPET_ENV === "production";

export default {
  input: 'index.js',
  output: {
    file: "dist/"+(production ? 'prod-verify.js': 'dev-verify.js'),
    format: 'umd', // Allows use as IIFE, AMD, or CJS!
    name: 'Goodforms',
    sourcemap: 'inline',
    intro: production ? "var HOST = 'https://api.goodforms.com'" : "var HOST = 'http://"+process.env.SERVERIP+":8000'"
  },
  watch: {
    include: ['*.js','*.css','*.mjs','*.html','*.less'], // WARNING - .css files are *NOT* watched!! I don't know why
    clearScreen: false
  },
  plugins: [
    // copy({
    //   targets: [
    //     { src: ['ui-progress-bar-indeterminate.gif', 'cross.png', 'accept.png'], dest: 'dist/' },
    //   ]
    // }),
    commonjs(),
    nodeResolve(),
    replace({
      'preventAssignment': false,
      'process.env.NODE_ENV': production ? JSON.stringify('production') : JSON.stringify('development'),
    }),
    postcss({
      inject: false,
      sourceMap: production ? false : "inline",
      minimize: production,
      use: {
        less: {
          globalVars: {
            CDN_URL: production ? '"http://cdn.goodforms.com/"' : '"http://'+process.env.SERVERIP+':8080/"'
          }
        }
      }
    }),
    html({
      include: '**/*.html',
      htmlMinifierOptions: {
        preset: production ? "comprehensive" : null
      }
    }),
    buble({
      targets: {ie: 6},
      transforms: { dangerousForOf: true }
    }),
  ]
}