import rollupConfig from './rollup.config.js';
import uglify from 'rollup-plugin-uglify';

const minConfig = rollupConfig;

minConfig.output.file = '../../dist/bundles/core.umd.min.js';
minConfig.plugins.push(uglify());

export default minConfig;
