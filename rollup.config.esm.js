import { baseConfig } from './rollup.config.base.js';

export default {
  ...baseConfig,
  output: {
    dir: 'lib-es',
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: 'src',
    exports: 'named'
  }
};