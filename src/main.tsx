import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import TimeProvider from './context/TimeProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TimeProvider>
      <App />
    </TimeProvider>
  </React.StrictMode>
);
