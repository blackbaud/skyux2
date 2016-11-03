import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import alias from 'rollup-plugin-alias';

export default {
  entry: '../../dist/core.js',
  dest: '../../dist/packages-dist/core/bundles/core.umd.js',
  format: 'umd',
  moduleName: 'skyux.core',
  context: 'this',
  globals: {
    '@angular/common': 'ng.common',
    '@angular/compiler': 'ng.compiler',
    '@angular/core': 'ng.core',
    '@angular/forms': 'ng.forms',
    "@angular/router": 'ng.router',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic'
  },
  external: [
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/forms',
    '@angular/router',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    'ng2-dragula/ng2-dragula'
  ],
  plugins: [
    nodeResolve()
  ]
};
