// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ItineraryProvider } from './context/ItineraryContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ItineraryProvider> {/* 우리가 만든 저장소로 앱을 감쌈 */}
      <App />
    </ItineraryProvider>
  </React.StrictMode>,)
