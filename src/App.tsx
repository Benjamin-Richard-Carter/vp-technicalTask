import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { Listings } from './types/listings';
import { fetchListings, queryParams } from './api/fetchListings';
import { ProductCard } from './components/product';
import { FacetCard } from './components/facet';
import { useFacetParams } from './hooks/useFacetParams';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';
import { LayoutGroup } from 'framer-motion';
import { SortOptions } from './components/options';
import { NumberParam, useQueryParams, withDefault } from 'use-query-params';

const apiKey = import.meta.env.VITE_APIKEY;
const url = `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=${apiKey}`;

function App() {
  const { ref, inView } = useInView();

  const pageSlug = 'toilets';
  const size: number = 10;
  const [appliedFacets, setAppliedFacets] = useState<queryParams['facets']>();
  const location = useLocation();
  const queryClient = useQueryClient();
  const sortByParam = withDefault(NumberParam, 1);
  const [sort, setSort] = useQueryParams({ sort: sortByParam });

  const handleSetSort = (sort: number) => {
    setSort({ sort });
  };

  const queryParams = {
    page_slug: pageSlug,
    size,
    sort: sort.sort,
    facets: appliedFacets,
  };

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    error,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery<Listings, Error>(
    ['listings', queryParams],
    ({ pageParam = 0 }) =>
      fetchListings(url, { ...queryParams, pageNumber: pageParam }),
    {
      getNextPageParam: (lastPage, pages) => {
        const nextFrom = lastPage.pagination.from + lastPage.pagination.size;
        return nextFrom < lastPage.pagination.total ? pages.length : undefined;
      },
      keepPreviousData: true,
    }
  );

  const resetPageCount = () => {
    queryClient.setQueryData(['listings', queryParams], (oldData: any) => {
      if (oldData && oldData.pages && oldData.pages.length > 0) {
        return {
          pages: [oldData.pages[0]],
          pageParams: [oldData.pageParams[0]],
        };
      }
      return oldData;
    });
  };

  useEffect(() => {
    setAppliedFacets(getAllFacetValues());
    resetPageCount();
  }, [location, sort]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const facets = data?.pages[0]?.facets || [];

  const {
    updateParams,
    clearParams,
    getFacetValues,
    getAllFacetValues,
    clearAllFacetValues,
  } = useFacetParams(facets);

  if (error) {
    return (
      <div>
        Error: {error.message}
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="bg-slate-200 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {facets.length > 0 && (
            <div className="w-full md:w-72 flex-shrink-0 mb-8 md:mb-0 md:mr-8 ">
              <div className="flex flex-col gap-3 w-full">
                <LayoutGroup>
                  <SortOptions
                    setSort={handleSetSort}
                    currentSort={sort.sort}
                  />
                  {facets.map((facet) => (
                    <FacetCard
                      key={facet.identifier}
                      facet={facet}
                      updateParams={updateParams}
                      clearParams={clearParams}
                      getFacetValues={getFacetValues}
                    />
                  ))}
                </LayoutGroup>
              </div>
            </div>
          )}
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data?.pages.flatMap((page, pageIndex) =>
                page.products.map((product) => (
                  <ProductCard
                    key={`${pageIndex}-${product.id}`}
                    details={product}
                  />
                ))
              )}
            </div>
            <div
              ref={ref}
              className="mt-4 text-center text-white">
              {isFetchingNextPage && 'loading'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
