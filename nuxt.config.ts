import type { NuxtConfig } from 'nuxt/config'

import { useHeadConfig } from './config'

const head = useHeadConfig()

const nuxtConfig: NuxtConfig = {
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  modules: ['@nuxthub/core'],

  // SEO Configuration
  app: {
    head,
  },

  nitro: {
    experimental: {
      openAPI: true,
    },
  },
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig(nuxtConfig)
