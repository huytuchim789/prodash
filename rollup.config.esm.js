import { baseConfig } from './rollup.config.base.js';
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    visualizer({
      open: process.env.STATS === 'true',
      filename: 'stats.html',
      title: 'Prodash Bundle Analysis',
      template: 'treemap', // 'treemap', 'sunburst', 'network'
    }),
  ],
  output: {
    dir: 'dist/esm',
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: 'src',
    exports: 'named',
  },
};
