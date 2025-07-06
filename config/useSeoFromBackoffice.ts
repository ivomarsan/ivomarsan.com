import { useVariables } from './useVariables';

export const useSeoFromBackoffice = () => {
  const { $variables } = useVariables();

  function getTitle() {
    const titleFromBackoffice = process.env.THEME_SEO_PAGE_TITLE;

    if (titleFromBackoffice) {
      return titleFromBackoffice;
    }

    return `${$variables.appName} 🍀 Cassino e Apostas Online | Apostas Esportivas`;
    }

    function getDescription() {
      const descriptionFromBackoffice = process.env.THEME_SEO_PAGE_DESCRIPTION;

      if (descriptionFromBackoffice) {
        return descriptionFromBackoffice;
      }

      return `${$variables.appName} é o melhor site de cassino 🎰 e apostas esportivas ⚽ com diversas opções de esportes para apostar, jogos de cassino para jogar e promoções exclusivas 🎁. Com uma plataforma intuitiva e segura, oferecemos milhares de jogos de cassino, jogos de esportes e suporte ao cliente 24/7.`;
    }

  return {
    title: getTitle(),
    description: getDescription()
  };
}
  
     