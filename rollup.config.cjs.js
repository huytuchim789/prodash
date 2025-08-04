import { baseConfig } from './rollup.config.base.js';

export default {
  ...baseConfig,
  output: {
    dir: 'lib',
    format: 'cjs',
    preserveModules: true,
    preserveModulesRoot: 'src',
    exports: 'named'
  }
};