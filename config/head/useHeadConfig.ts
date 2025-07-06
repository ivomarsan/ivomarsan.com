import type { NuxtAppConfig } from 'nuxt/schema';


import { useBuildVariables } from '../useBuildVariables';
import { useLinkConfig } from './useLinkConfig';
import { useMetaConfig } from './useMetaConfig';

export const useHeadConfig = (): NuxtAppConfig['head'] => {
  const { $variables } = useBuildVariables();

  const htmlAttrs = {
    lang: 'pt-BR'
  }

  const charset = 'utf-8';

  const viewport = 'width=device-width, initial-scale=1';

  const title = $variables.appName;

  return {
    htmlAttrs,
    charset,
    viewport,
    title,
    meta: useMetaConfig(),
    link: useLinkConfig(),
  };
}