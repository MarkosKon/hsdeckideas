import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import FAQ from './FAQ';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router initialEntries={['/faq/']}>
      <FAQ />
    </Router>,
    div,
  );
});
