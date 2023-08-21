import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import { DataInputContextProvider } from './context/DataInputContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataInputContextProvider>
        <App />
      </DataInputContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
) 
