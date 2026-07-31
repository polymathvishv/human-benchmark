import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import posthog from 'posthog-js'

posthog.init(import.meta.env.VITE_POSTHOG_PROJECT_TOKEN as string, {
  api_host: import.meta.env.VITE_POSTHOG_HOST as string,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
