import path from 'node:path';

import { defineConfig } from 'vite';
import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import sassDts from 'vite-plugin-sass-dts';

import dotenv from 'dotenv';

import { validatePreBuildEnv } from './src/app/env';

dotenv.config({
  path: `${__dirname}/.env.${
    process.env.NODE_ENV === 'production' ? 'production' : 'development'
  }`,
});

validatePreBuildEnv();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    sassDts({
      enabledMode: ['development'],
      legacyFileFormat: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      generateScopedName:
        process.env.NODE_ENV === 'development'
          ? '[local]_[hash:base64:5]'
          : '[hash:base64:12]',
      localsConvention: 'camelCaseOnly',
    },
  },
  server: {
    port: Number(process.env.APP_PORT),
    proxy: {
      '/api': {
        target: process.env.APP_API_ORIGIN,
      },
      // '/socket-io': {
      //   target: process.env.APP_WS_ORIGIN,
      //   ws: true,
      //   changeOrigin: true,
      //   rewriteWsOrigin: true
      // },
    },
  },
  build: {
    sourcemap: true,
  },
  envPrefix: 'APP_',
});
