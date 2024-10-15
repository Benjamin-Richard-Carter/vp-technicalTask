import { useQuery } from 'react-query';
import { Listings } from './types/listings';

const apiKey = import.meta.env.VITE_APIKEY as string;
const url = `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=${apiKey}`;
const page_slug = 'toilets';

const fetchListings = async (): Promise<Listings> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: page_slug,
      pageNumber: 0,
      size: 0,
      additionalPages: 0,
      sort: 1,
    }),
  });

  if (!response.ok) {
    throw response;
  }

  return response.json();
};

function App() {
  const { data, isLoading, error, refetch } = useQuery<Listings, Response>(
    'listings',
    fetchListings,
    {
      retry: false,
    }
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return (
      <div>
        Error: {error.statusText} code: {error.status}
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return <div>{JSON.stringify(data)}</div>;
}

export default App;
