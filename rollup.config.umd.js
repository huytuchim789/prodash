import { baseConfig, minifiedPlugins } from './rollup.config.base.js';

export default [
  // UMD build
  {
    ...baseConfig,
    output: {
      file: 'dist/umd/prodash.js',
      format: 'umd',
      name: 'prodash',
      exports: 'named',
    },
  },
  // UMD minified build
  {
    ...baseConfig,
    plugins: minifiedPlugins,
    output: {
      file: 'dist/umd/prodash.min.js',
      format: 'umd',
      name: 'prodash',
      exports: 'named',
    },
  },
];
