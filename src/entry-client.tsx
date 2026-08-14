import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import posthog from 'posthog-js'

// Guard: posthog uses window APIs that don't exist in SSR/Node
if (typeof window !== 'undefined') {
  posthog.init(import.meta.env.VITE_POSTHOG_PROJECT_TOKEN as string, {
    api_host: import.meta.env.VITE_POSTHOG_HOST as string,
  })
}

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
