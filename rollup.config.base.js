import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export const baseConfig = {
  input: 'src/index.ts',
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false, // We'll handle declarations separately
      declarationMap: false
    })
  ],
  external: [] // No external dependencies for a utility library
};

export const minifiedPlugins = [
  ...baseConfig.plugins,
  terser({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false
    }
  })
];