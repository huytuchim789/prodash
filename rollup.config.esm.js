import { baseConfig } from './rollup.config.base.js';

export default {
  ...baseConfig,
  output: {
    dir: 'dist/esm',
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: 'src',
    exports: 'named',
  },
};
