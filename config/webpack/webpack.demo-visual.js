var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('../utils/helpers');
var glob = require('glob');
var path = require('path');
var plugins = [];
var entry = {};

(function () {
  var files = glob.sync('./src/modules/**/fixtures/*.component.visual-fixture.ts');

  files.forEach(function (file) {
    var demoName;
    var dirname;
    var parts;

    dirname = path.dirname(file);
    parts = dirname.split('/'); // glob always returns '/' as separator
    demoName = parts[parts.length - 2];
    entry[demoName] = file;

    plugins.push(new HtmlWebpackPlugin({
      template: 'visual/index.html',
      chunks: ['polyfills', 'vendor', demoName],
      chunksSortMode: helpers.packageSort(['polyfills', 'vendor', demoName]),
      filename: demoName + '.html'
    }));
  });

  // Create landing page for easier debugging
  plugins.push(new HtmlWebpackPlugin({
    inject: false,
    entry: entry,
    template: 'visual/index.ejs',
    filename: 'index.html'
  }));

}());

exports.buildVisualConfig = function () {
  return {
    entry: entry,
    plugins: plugins
  };
};
