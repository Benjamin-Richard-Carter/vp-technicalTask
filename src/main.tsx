import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import '../index.css';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { EnterApiKey } from './components/apiKey.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to="/enter-api-key"
                  replace
                />
              }
            />
            <Route
              path="/enter-api-key"
              element={<EnterApiKey />}
            />
            <Route
              path="/:apiKey/*"
              element={<App />}
            />
          </Routes>
        </QueryClientProvider>
      </QueryParamProvider>
    </BrowserRouter>
  </StrictMode>
);
