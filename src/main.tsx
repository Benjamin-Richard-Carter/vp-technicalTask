import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../index.css';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route
              path="/"
              element={<App />}
            />
          </Routes>
        </QueryClientProvider>
      </QueryParamProvider>
    </BrowserRouter>
  </StrictMode>
);
