// amazing esbuild tool

import { build } from 'esbuild'

const isDev = process.env.NODE_ENV === "development"

// node ESM
await build({
  entryPoints: ['src/lib.mjs'],
  bundle: true,
  minify: !isDev,
  sourcemap: isDev,
  outfile: 'build/lib.mjs',
  platform: 'node',
  format: 'esm',
  packages: 'external',
  logLevel: 'info'
})

// browser CommonJS
await build({
  entryPoints: ['src/lib.mjs'],
  bundle: true,
  minify: !isDev,
  sourcemap: isDev,
  outfile: 'build/lib.cjs',
  platform: 'browser',
  format: 'cjs',
  packages: 'external',
  logLevel: 'info'
})

// web worker, etc...
await build({
  entryPoints: ['src/lib.mjs'],
  bundle: true,
  minify: !isDev,
  sourcemap: isDev,
  outfile: 'build/lib.js',
  platform: 'browser',
  format: 'iife',
  logLevel: 'info'
})