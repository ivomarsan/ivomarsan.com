import { useBuildVariables } from './useBuildVariables';

export const useSeoFromBackoffice = () => {
  const { $variables } = useBuildVariables();

  function getTitle() {
    const titleFromBackoffice = process.env.THEME_SEO_PAGE_TITLE;

    if (titleFromBackoffice) {
      return titleFromBackoffice;
    }

    return `${$variables.appName} - Desenvolvedor Front-End`;
  }

  function getDescription() {
    const descriptionFromBackoffice = process.env.THEME_SEO_PAGE_DESCRIPTION;

    if (descriptionFromBackoffice) {
      return descriptionFromBackoffice;
    }

    return `Desenvolvedor Front-End especializado em Nuxt. Criando soluções web inovadoras e performáticas.`;
  }

  return {
    $seo: {
      title: getTitle(),
      description: getDescription(),
    },
  };
};
