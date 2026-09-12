import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { startBackend } from './services/backend'

async function startApp() {
  try {
    await startBackend()

    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  } catch (error) {
    console.error('Failed to start FileSense backend:', error)
  }
}

startApp()