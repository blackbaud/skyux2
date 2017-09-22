import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: '../../dist/core.js',
  dest: '../../dist/bundles/core.umd.js',
  format: 'umd',
  moduleName: 'skyux.core',
  context: 'this',
  globals: {
    '@angular/common': 'ng.common',
    '@angular/compiler': 'ng.compiler',
    '@angular/core': 'ng.core',
    '@angular/forms': 'ng.forms',
    '@angular/router': 'ng.router',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    '@angular/platform-browser': 'ng.platformBrowser',
    'moment': 'moment',
    'ng2-dragula/ng2-dragula': 'ng2.dragula'
  },
  external: [
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/forms',
    '@angular/router',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    'moment/moment',
    'ng2-dragula/ng2-dragula'
  ],
  plugins: [
    nodeResolve(),
    commonjs()
  ]
};
