import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import json from '@rollup/plugin-json';

const packageJson = JSON.parse(readFileSync('./package.json'));

// Custom plugin to copy package.json to dist folder
function copyPackageJson() {
  return {
    name: 'copy-package-json',
    generateBundle(options) {
      const outputDir = options.dir || dirname(options.file);
      const distRoot = outputDir.includes('/') ? outputDir.split('/')[0] : 'dist';

      // Only copy once (when building the first format)
      if (outputDir.includes('esm')) {
        try {
          mkdirSync(distRoot, { recursive: true });
          writeFileSync(`${distRoot}/package.json`, JSON.stringify(packageJson, null, 2));
          console.log(`✅ Copied package.json to ${distRoot}/package.json`);
        } catch (error) {
          console.warn('⚠️ Failed to copy package.json:', error.message);
        }
      }
    },
  };
}

export const baseConfig = {
  input: 'src/index.ts',
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false, // We'll handle declarations separately
      declarationMap: false,
      outDir: undefined, // Let Rollup handle output directory
      sourceMap: true,
    }),
    json(),
    copyPackageJson(),
  ],
  external: [], // No external dependencies for a utility library
};

export const minifiedPlugins = [
  ...baseConfig.plugins,
  terser({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false,
    },
  }),
];
