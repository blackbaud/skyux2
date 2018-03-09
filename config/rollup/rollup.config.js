import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import shared from './shared';

export default {
  entry: '../../dist/core.js',
  dest: '../../dist/bundles/core.umd.js',
  format: 'umd',
  moduleName: 'skyux.core',
  context: 'this',
  globals: shared.globals,
  external: shared.external,
  plugins: [
    nodeResolve(),
    commonjs()
  ]
};
