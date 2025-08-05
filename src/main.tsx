import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import TelegramAnalytics from '@telegram-apps/analytics'

TelegramAnalytics.init({
  token: 'eyJhcHBfbmFtZSI6InRoZV9vcGVuX21hcmtldCIsImFwcF91cmwiOiJodHRwczovL3QubWUvb3BuX21rdF9ib3QiLCJhcHBfZG9tYWluIjoiaHR0cHM6Ly90b20tY2xpZW50LnZlcmNlbC5hcHAifQ==!0tuxk2oZO/1xNbLG4dSWtUwDBT8PsQt2puUG1mWl9GY=',
  appName: 'the_open_market',
});

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
