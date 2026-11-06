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

