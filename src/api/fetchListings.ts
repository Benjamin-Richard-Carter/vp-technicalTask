import { Facet, Listings } from '../types/listings';

type queryParams = {
  url: string;
  page_slug: string;
  size?: number;
  sort?: number;
  pageNumber?: number;
  additionalPages?: number;
  facets?: Facet[];
};

type fetchListings = (params: queryParams) => Promise<Listings>;

export const fetchListings: fetchListings = async ({ url, page_slug }) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: page_slug,
      pageNumber: 0,
      size: 819,
      additionalPages: 0,
      sort: 1,
    }),
  });

  if (!response.ok) {
    throw response;
  }

  return response.json();
};
