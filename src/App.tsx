import { useQuery } from 'react-query';

const apiKey = import.meta.env.VITE_APIKEY as string;
const url = `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=${apiKey}`;
const page_slug = 'toilets';

const fetchListings = async () => {
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
    console.log(response.status);
    throw new Error('response failed');
  }

  return response.json();
};

function App() {
  const { data, isLoading, error } = useQuery('listings', fetchListings);

  if (isLoading) return <div>loading</div>;
  if (error) return <div>error: {JSON.stringify(error)}</div>;

  return <div>{JSON.stringify(data)}</div>;
}

export default App;
