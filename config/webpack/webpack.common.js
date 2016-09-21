var webpack = require('webpack');
var helpers = require('../utils/helpers');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractScss = new ExtractTextPlugin('sky.css');

var METADATA = {
  title: 'SKY UX 2',
  baseUrl: '/'
};

module.exports = {

  metadata: METADATA,

  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts'
  },

  resolve: {

    extensions: ['', '.ts', '.js'],

    root: helpers.root('src'),

    modulesDirectories: ['node_modules']

  },

  module: {

    preLoaders: [

      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular/compiler/bundles')
        ]
      }

    ],

    loaders: [

      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      {
        test: /\.css$/,
        loader: 'raw-loader'
      },

      {
        test: /\.scss$/,
        loader: 'raw-loader!sass-loader',
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

    new webpack.optimize.OccurenceOrderPlugin(true),

    new webpack.optimize.CommonsChunkPlugin({
      name: helpers.reverse(['polyfills', 'vendor'])
    }),

  ],

  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};
