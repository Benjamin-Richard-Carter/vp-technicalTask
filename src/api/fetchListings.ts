import { FacetValue, Listings } from '../types/listings';

export type queryParams = {
  page_slug: string;
  pageNumber?: number;
  size?: number;
  additionalPages?: number;
  sort?: number;
  facets?: {
    [key: string]: {
      identifier: string;
      value: FacetValue;
    }[];
  };
};

type fetchListings = (URI: string, params: queryParams) => Promise<Listings>;

export const fetchListings: fetchListings = async (URI, params) => {
  const response = await fetch(URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: params.page_slug,
      pageNumber: params.pageNumber,
      size: params.size,
      additionalPages: params.additionalPages,
      sort: params.sort,
      facets: params.facets,
    }),
  });

  if (!response.ok) {
    throw response.status;
  }

  return response.json();
};
