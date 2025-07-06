import type { NuxtConfig } from 'nuxt/config';

import { useHeadConfig } from "./config";

const { htmlAttrs, charset, viewport, title, meta, link } = useHeadConfig()

const nuxtConfig: NuxtConfig = {
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  
  // SEO Configuration
  app: {
    head: {
      htmlAttrs,
      charset,
      viewport,
      title,
      meta,
      link
    }
  },

  nitro: {
    preset: 'bun',
    experimental: {
      openAPI: true
    }
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig(nuxtConfig);