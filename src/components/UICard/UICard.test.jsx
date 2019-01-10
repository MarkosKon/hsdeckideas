import React from 'react';
import ReactDOM from 'react-dom';
import UICard from './UICard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UICard />, div);
});
