import '@babel/polyfill';
import React from 'react';
import { render, hydrate } from 'react-dom';
import Loadable from 'react-loadable';
import 'normalize.css';

import Loading from './components/Loading/Loading';

const LoadableApp = Loadable({
  loader: () => import('./App'),
  loading: Loading,
});

const root = document.getElementById('root');
if (root.hasChildNodes()) hydrate(<LoadableApp />, root);
else render(<LoadableApp />, root);

// Check that service workers are registered
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
