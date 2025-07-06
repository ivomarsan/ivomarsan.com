import type { NuxtAppConfig } from 'nuxt/schema';

export const useHeadConfig = (): NuxtAppConfig['head'] => {
  const htmlAttrs = {
    lang: 'pt-BR'
  }

  const charset = 'utf-8';

  const viewport = 'width=device-width, initial-scale=1';

  const title = 'ivomarsan';

  return {
    htmlAttrs,
    charset,
    viewport,
    title,
  };
}