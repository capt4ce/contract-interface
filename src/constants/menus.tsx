import PageHome from '../pages/PageHome';

import defaultLogo from '../logo.svg';
import PageDiamondFacetParams from '../pages/PageDiamondFacetParams';

type PageInterface = {
  path: string;
  label: string;
  pages: PageInterface[];
  Component?: () => JSX.Element;
};

const project = process.env.REACT_APP_PROJECT_SELECTED;

const getPages = (): PageInterface[] => {
  const defaultPages: PageInterface[] = [
    {
      path: '/',
      label: 'Contract Tester',
      pages: [],
      Component: PageHome,
    },
    {
      path: 'diamond-facet',
      label: 'Diamond Facet',
      pages: [],
      Component: PageDiamondFacetParams,
    },
  ];

  return [...defaultPages];
};

export const pages = getPages();

export const logo = defaultLogo;
export const webTitle = 'Airdrop Tech';
