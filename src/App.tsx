import { useQuery } from 'react-query';
import { Listings } from './types/listings';
import { fetchListings } from './api/fetchListings';
import { ProductCard } from './components/product';
import { Sidebar } from './components/sidebar';

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

  const products = data?.products;
  const facets = data?.facets;

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
          {facets && (
            <div className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0 md:mr-8">
              <Sidebar facets={facets} />
            </div>
          )}
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products?.map((product) => (
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
