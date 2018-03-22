const helpers = require('../utils/helpers');

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [helpers.root('src'), 'node_modules']
  },

  module: {
    rules: [

      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular/compiler')
        ]
      },

      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              // Ignore the "Cannot find module" error that occurs when referencing
              // an aliased file.  Webpack will still throw an error when a module
              // cannot be resolved via a file path or alias.
              ignoreDiagnostics: [2307],
              // Linting is handled by the sky-tslint loader.
              transpileOnly: true
            }
          },
          {
            loader: 'angular2-template-loader'
          }
        ],
        exclude: [/\.e2e\.ts$/]
      },
      {
        test: /\.css$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.scss$/,
        use: [
          'raw-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.png$/,
        loader: 'base64-image-loader'
      },

      {
        enforce: 'post',
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader!source-map-inline-loader',
        include: helpers.root('src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/,
          /index\.ts/,
          /fixtures/,
          /testing/
        ]
      }
    ]
  },

  plugins: [
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'HMR': false,
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV),
        'HMR': false,
      }
    }),

    new LoaderOptionsPlugin({
      debug: true,
      options: {
      tslint: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: 'src'
        }
      }
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
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  performance: {
    hints: false
  }

};
