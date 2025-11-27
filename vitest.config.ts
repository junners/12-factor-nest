/* eslint-disable unicorn/prefer-module */
// eslint-disable-next-line unicorn/import-style
import * as path from 'node:path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  resolve: {
    alias: {
      '@common/app-config': path.resolve(__dirname, './libs/app-config/src'),
      '@common/bull': path.resolve(__dirname, './libs/bull/src'),
      '@common/health-check': path.resolve(
        __dirname,
        './libs/health-check/src',
      ),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'cobertura', 'lcov'],
    },
    globals: true,
    include: ['**/*.e2e-spec.ts', '**/*.spec.ts'],
    reporters: ['default'],
    root: './',
  },
});
