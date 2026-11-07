import React from 'react';
import ReactDOM from 'react-dom/client';
import { CulturalProvider } from './context/CulturalContext';
import { AppContent } from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CulturalProvider>
      <AppContent />
    </CulturalProvider>
  </React.StrictMode>
);

// Register Progressive Web App (PWA) Service Worker for mobile installability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('PWA ServiceWorker registration failed: ', err);
    });
  });
}


