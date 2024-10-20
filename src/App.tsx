import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { Listings } from './types/listings';
import { fetchListings, queryParams } from './api/fetchListings';
import { ProductCard } from './components/product';
import { FacetCard } from './components/facet';
import { useFacetParams } from './hooks/useFacetParams';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';
import { LayoutGroup } from 'framer-motion';
import { SortOptions } from './components/options';
import { AppliedFacets } from './components/appliedFacets';
import { ErrorDialog } from './components/error';

function App() {
  const { ref, inView } = useInView();
  const [appliedFacets, setAppliedFacets] = useState<queryParams['facets']>();
  const queryClient = useQueryClient();
  const [sort, setSort] = useState<number>(1);
  const { apiKey } = useParams();
  const url = `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=${apiKey}`;
  const pageSlug = 'toilets';

  const queryParams = {
    page_slug: pageSlug,
    size: 10,
    sort: sort,
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
      retry: false,
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
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const facets = data?.pages[0]?.facets || [];
  const totalProducts = data?.pages[0]?.pagination.total || 0;

  const {
    updateParams,
    clearParams,
    getFacetValues,
    getQueryValues,
    clearAllFacetValues,
    getAllFacetValues,
    query,
  } = useFacetParams(facets);

  useEffect(() => {
    setAppliedFacets(getQueryValues());
    resetPageCount();
  }, [query]);

  if (error) {
    return (
      <ErrorDialog
        error={error}
        refetch={refetch}
      />
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
                    setSort={setSort}
                    currentSort={sort}
                    totalProducts={totalProducts}
                  />
                  <AppliedFacets
                    getAllFacetValues={getAllFacetValues}
                    clearAllFacetValues={clearAllFacetValues}
                    updateParams={updateParams}
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
                    updateParams={updateParams}
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
