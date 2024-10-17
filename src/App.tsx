import { useQuery } from 'react-query';
import { Listings } from './types/listings';
import { fetchListings } from './api/fetchListings';
import { ProductCard } from './components/product';
import { FacetCard } from './components/facet';
import { useFacetParams } from './hooks/useFacetParams';

function App() {
  const apiKey = import.meta.env.VITE_APIKEY;
  const url = `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=${apiKey}`;
  const page_slug = 'toilets';

  const queryParams = {
    url,
    page_slug,
    size: 50,
    sort: 1,
    pageNumber: 0,
    additionalPages: 0,
  };

  const { data, isLoading, error, refetch } = useQuery<Listings, Error>(
    JSON.stringify(queryParams),
    () => fetchListings(queryParams),
    { retry: false }
  );

  const facets = data?.facets || [];

  const { updateParams, clearParams, getFacetValues, getAllFacetValues } =
    useFacetParams(facets);

  const getAllValues = getAllFacetValues();

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return (
      <div>
        Error: {error.message}
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {data?.facets && (
            <div className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0 md:mr-8">
              <div className="flex flex-col gap-3 w-full">
                {data.facets?.map((facet) => (
                  <FacetCard
                    key={facet.displayName}
                    facet={facet}
                    updateParams={updateParams}
                    clearParams={clearParams}
                    getFacetValues={getFacetValues}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="flex-grow">
            <div className="bg-red-500">{JSON.stringify(getAllValues)}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data?.products?.map((product) => (
                <ProductCard
                  key={product.id}
                  details={product}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
