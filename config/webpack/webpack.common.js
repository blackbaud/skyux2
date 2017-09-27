const webpack = require('webpack');
const helpers = require('../utils/helpers');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');

const extractScss = new ExtractTextPlugin('sky.css');

const METADATA = {
  title: 'SKY UX 2',
  baseUrl: '/'
};

module.exports = {

  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts'
  },

  externals: [
    /^@angular\//,
    /^@blackbaud\//,
    /^rxjs\//
  ],

  resolve: {

    extensions: ['.ts', '.js'],

    modules: [helpers.root('src'), 'node_modules']

  },
  resolveLoader: {
    modules: [
      helpers.root('node_modules')
    ]
  },

  module: {

    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          // https://github.com/angular-redux/store/issues/64
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular/compiler')
        ]
      },

      {
        test: /\.ts$/,
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      {
        test: /\.css$/,
        loader: 'raw-loader'
      },

      {
        test: /\.scss$/,
        use: [
          'raw-loader',
          'sass-loader'
        ],
        exclude: [
          helpers.root('src/scss/sky.scss')
        ]
      },

      {
        test: /sky.scss$/,
        loader: extractScss.extract(['css', 'sass'])
      },

      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },

      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },

      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },

      {
        test: /\.png$/,
        loader: 'base64-image-loader'
      }
  ],

  },

  plugins: [

    extractScss,

    new webpack.optimize.CommonsChunkPlugin({
      name: helpers.reverse(['polyfills', 'vendor'])
    }),

    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('src') // location of your src
    ),
    new IgnorePlugin(/^\.\/locale$/, /moment$/)

  ],

  node: {
    global: true,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  performance: {
    hints: false
  }

};
