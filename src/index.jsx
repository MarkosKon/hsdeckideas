import '@babel/polyfill';
import React from 'react';
import { render, hydrate } from 'react-dom';
import 'normalize.css';

import App from './App';

const root = document.getElementById('root');
if (root.hasChildNodes()) hydrate(<App />, root);
else render(<App />, root);

// Check that service workers are registered
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
