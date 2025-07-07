import type { NuxtConfig } from 'nuxt/config';

import { useHeadConfig } from './config';

const head = useHeadConfig();

const nuxtConfig: NuxtConfig = {
  compatibilityDate: '2025-05-15',

  devtools: {
    enabled: process.env.NODE_ENV === 'development',
    timeline: {
      enabled: process.env.NODE_ENV === 'development',
    },
  },

  css: ['@/assets/css/main.css'],

  modules: ['@nuxthub/core', '@nuxt/fonts'],

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router'],
          },
        },
      },
    },
  },

  // SEO Configuration
  app: {
    head,
  },

  nitro: {
    experimental: {
      openAPI: true,
    },
    compressPublicAssets: true,
    minify: true,
  },
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig(nuxtConfig);
