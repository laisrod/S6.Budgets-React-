import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { BudgetProvider } from './context/BudgetContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BudgetProvider>
        <App />
      </BudgetProvider>
    </BrowserRouter>
  </StrictMode>,
)

