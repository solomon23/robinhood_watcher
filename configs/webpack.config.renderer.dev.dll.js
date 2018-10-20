/* eslint global-require: 0, import/no-dynamic-require: 0 */

/**
 * Builds the DLL for development electron renderer process
 */

import webpack from 'webpack'
import path from 'path'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'
import { dependencies } from '../package'
import CheckNodeEnv from '../internals/scripts/CheckNodeEnv'

CheckNodeEnv('development')

const dist = path.join(__dirname, '..', 'dll')

export default merge.smart(baseConfig, {
  context: path.join(__dirname, '..'),

  devtool: 'eval',

  mode: 'development',

  target: 'electron-renderer',

  externals: ['fsevents', 'crypto-browserify'],

  /**
   * Use `module` from `webpack.config.renderer.dev.js`
   */
  module: require('./webpack.config.renderer.dev').module,

  entry: {
    renderer: Object.keys(dependencies || {}).filter(
      dependency => dependency !== '@fortawesome/fontawesome-free'
    ),
  },

  output: {
    library: 'renderer',
    path: dist,
    filename: '[name].dev.dll.js',
    libraryTarget: 'var',
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(dist, '[name].json'),
      name: '[name]',
    }),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: path.join(__dirname, '..', 'app'),
        output: {
          path: path.join(__dirname, '..', 'dll'),
        },
      },
    }),
  ],
})
