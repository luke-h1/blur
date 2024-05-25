import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/index.tsx'],
  sourcemap: true,
  clean: true,
  dts: true,
  minify: true,
  format: ['esm', 'cjs'],
  banner: {
    js: '/* Blur */',
  },
});
