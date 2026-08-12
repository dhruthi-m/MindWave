import React from 'react';
import ReactDOM from 'react-dom/client';
import CombinedScreeningTest from './CombinedScreeningTest';
import './tailwind.css';

const rootElement = document.getElementById('combined-react-root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <CombinedScreeningTest onBackToMenu={() => {
        window.location.href = '/screening.html';
      }} />
    </React.StrictMode>
  );
}
