import { useState } from 'react';
import { MdLockOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const EnterApiKey = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <div className="flex items-center justify-center w-full h-full bg-slate-200 min-h-screen flex-col">
      <div className="flex flex-col items-center rounded-2xl justify-center ">
        <div className="flex flex-col items-center gap-3">
          <div className="text-7xl">
            <MdLockOutline />
          </div>
          <h1 className="text-3xl font-semibold">Enter API key</h1>

          <div className="flex flex-col p-2 gap-3 w-full ">
            <input
              type="text"
              className="p-2 rounded-xl min-w-96"
              onChange={(e) => setInputValue(e.target.value)}
            />

            <button
              className="bg-blue-200 w-full p-3 text-xl font-semibold rounded-2xl"
              onClick={() => navigate(`/${inputValue}`)}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
