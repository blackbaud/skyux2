import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import shared from './shared';

export default {
  entry: '../../dist/demo.js',
  dest: '../../dist/bundles/demo.umd.js',
  format: 'umd',
  moduleName: 'skyux.demo',
  context: 'this',
  globals: shared.globals,
  external: shared.external,
  plugins: [
    nodeResolve(),
    commonjs()
  ]
};
