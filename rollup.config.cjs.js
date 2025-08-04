import { baseConfig } from './rollup.config.base.js';

export default {
  ...baseConfig,
  output: {
    dir: 'dist/cjs',
    format: 'cjs',
    preserveModules: true,
    preserveModulesRoot: 'src',
    exports: 'named',
  },
};
