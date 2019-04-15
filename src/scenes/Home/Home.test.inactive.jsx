// cannot test because of workerize-loader
// https://github.com/webpack-contrib/worker-loader/issues/10
// maybe remove the worker?

import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import Home from './Home';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router initialEntries={['/']}>
      <Home />
    </Router>,
    div,
  );
});
