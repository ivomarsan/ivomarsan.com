import type { NuxtAppConfig } from 'nuxt/schema'

import { useBuildVariables } from '../useBuildVariables'
import { useSeoFromBackoffice } from '../useSeoFromBackoffice'

export const useMetaConfig = (): NuxtAppConfig['head']['meta'] => {
  const { $variables } = useBuildVariables()
  const { $seo } = useSeoFromBackoffice()

  const metaTagsBase = [
    {
      name: 'theme-color',
      content: $variables.themeColor,
    },
    {
      name: 'apple-mobile-web-app-title',
      content: $variables.appName,
    },
    {
      name: 'author',
      content: 'ivomarsan',
    },
    {
      name: 'description',
      content: $seo.description,
    },
    {
      name: 'keywords',
      content:
        'desenvolvedor, front-end, vue, nodejs, javascript, typescript, web developer',
    },

    // Open Graph
    {
      name: 'og:title',
      content: $seo.title,
    },
    {
      name: 'og:site_name',
      content: $variables.SEO_DEFALT_OG_SITE_NAME,
    },
    {
      name: 'og:type',
      content: 'website',
    },
    {
      name: 'og:description',
      content: $seo.description,
    },
    {
      name: 'og:url',
      content: $variables.OG_URL,
    },
    {
      name: 'og:image',
      content: $variables.OG_IMAGE_PREVIEW,
    },
    {
      name: 'og:image:width',
      content: $variables.OG_IMAGE_WIDTH,
    },
    {
      name: 'og:image:height',
      content: $variables.OG_IMAGE_HEIGHT,
    },
    {
      name: 'og:image:type',
      content: $variables.OG_IMAGE_TYPE,
    },
    {
      name: 'og:image:secure_url',
      content: $variables.OG_IMAGE_PREVIEW,
    },
    {
      name: 'og:image:alt',
      content: $variables.SEO_OG_ALT_IMG,
    },
    {
      name: 'x-build-id',
      content: $variables.BUILD_UNIQUE_ID,
    },
    {
      name: 'build-version',
      content: 'multi-app',
    },
  ]

  const metaTags = [
    {
      charset: 'utf-8',
    },
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover, user-scalable=yes, shrink-to-fit=no',
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
  ]

  if ($variables.ROBOTS_NO_INDEX) {
    metaTags.push({
      name: 'robots',
      content: 'noindex, nofollow',
    })
  }

  if ($variables.GOOGLE_SITE_VERIFICATION) {
    metaTags.push({
      name: 'google-site-verification',
      content: $variables.GOOGLE_SITE_VERIFICATION,
    })
  }

  if ($variables.FACEBOOK_DOMAIN_VERIFICATION) {
    metaTags.push({
      name: 'facebook-domain-verification',
      content: $variables.FACEBOOK_DOMAIN_VERIFICATION,
    })
  }

  for (let i = 0; i < metaTagsBase.length; i++) {
    const metaTag = metaTagsBase[i]

    if (metaTag.content?.trim()) {
      metaTag.content = metaTag.content.trim()
      metaTags.push(metaTag)
    } else if ($variables.PRINT_BUILD_DEBUGS) {
      console.log(`TAG NAME: ${metaTag.name} [SKIP PQ N TEM CONTENT]`)
    }
  }

  return metaTags
}
