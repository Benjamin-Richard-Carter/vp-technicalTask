import { Facet } from './listings';

export type queryParams = {
  url: string;
  page_slug: string;
  size?: number;
  sort?: number;
  pageNumber?: number;
  additionalPages?: number;
  facets?: Facet[];
};
