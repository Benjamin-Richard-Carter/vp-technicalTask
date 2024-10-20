import { IoWarningOutline } from 'react-icons/io5';

type ErrorProps = {
  error: Error;
  refetch: () => void;
};

export const ErrorDialog = ({ error, refetch }: ErrorProps) => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-slate-200 min-h-screen flex-col">
      <div className="flex flex-col gap-5 items-center p-5 rounded-2xl justify-center">
        <div className=" flex flex-row items-center">
          <div className="text-7xl">
            <IoWarningOutline />
          </div>

          <div className="flex flex-col p-5">
            <h1 className="text-3xl font-semibold">Server request failed</h1>
            <h1 className="text-2xl">Error: {error.name}</h1>
          </div>
        </div>
        <button
          className="bg-blue-200 w-full p-3 text-2xl font-semibold rounded-2xl"
          onClick={refetch}>
          Retry
        </button>
      </div>
    </div>
  );
};
