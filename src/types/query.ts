import { useFacetParams } from '../hooks/useFacetParams';
import { Facet } from './listings';

export type queryParams = {
  page_slug: string;
  size?: number;
  sort?: number;
  pageNumber?: number;
  additionalPages?: number;
  facets?: Facet[];
};

export type UseFacetParamsReturn = ReturnType<typeof useFacetParams>;
