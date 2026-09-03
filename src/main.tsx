import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import WordProvider from './context/WordProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WordProvider>
      <App />
    </WordProvider>
  </StrictMode>,
)
