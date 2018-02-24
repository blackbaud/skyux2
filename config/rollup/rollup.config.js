import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import shared from './shared';

export default {
  input: '../../dist/core.js',
  output: {
    file: '../../dist/bundles/core.umd.js',
    format: 'umd',
    globals: shared.globals,
    name: 'skyux.core'
  },
  context: 'this',
  external: shared.external,
  plugins: [
    nodeResolve(),
    commonjs()
  ]
};
