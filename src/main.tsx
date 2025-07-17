import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

const queryClient = new QueryClient();
const manifestUrl = 'https://raw.githubusercontent.com/johntad110/tom_client/refs/heads/master/public/tonconnect-manifest.json';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <App />
      </TonConnectUIProvider>
    </QueryClientProvider>
  </StrictMode>
)
