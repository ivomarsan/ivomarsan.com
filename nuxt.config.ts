import type { NuxtConfig } from 'nuxt/config';

const nuxtConfig: NuxtConfig = {
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  nitro: {
    experimental: {
      openAPI: true
    }
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig(nuxtConfig);