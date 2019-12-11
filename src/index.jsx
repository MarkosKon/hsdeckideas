import '@babel/polyfill';
import React from 'react';
import { render, hydrate } from 'react-dom';
import { toast } from 'react-toastify';

import App from './App';

import './global.css';
import 'normalize.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const root = document.getElementById('root');
if (root.hasChildNodes()) hydrate(<App />, root);
else render(<App />, root);

// Check that service workers are registered
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    // This should not throw a lint error because we have an if.
    // eslint-disable-next-line compat/compat
    navigator.serviceWorker.register('/service-worker.js');
  });
}
