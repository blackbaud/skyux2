import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import shared from './shared';

export default {
  input: '../../dist/demo.js',
  output: {
    file: '../../dist/bundles/demo.umd.js',
    format: 'umd',
    globals: shared.globals,
    name: 'skyux.demo'
  },
  context: 'this',
  external: shared.external,
  plugins: [
    nodeResolve(),
    commonjs()
  ]
};
