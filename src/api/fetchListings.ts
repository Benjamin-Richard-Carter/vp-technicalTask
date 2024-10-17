import { Listings } from '../types/listings';
import { queryParams } from '../types/query';

type fetchListings = (params: queryParams) => Promise<Listings>;

export const fetchListings: fetchListings = async (params) => {
  const response = await fetch(params.url, {
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
    throw response;
  }

  return response.json();
};
