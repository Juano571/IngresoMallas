import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import { DataContextProvider } from './context/DataContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataContextProvider>
          <App />
      </DataContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
) 
