import React from 'react';
import ReactDOM from 'react-dom';
import History from './History';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <History
      deck={{ history: { steps: [], totalPrioritiesExamined: {}, totalDeckFiltersExamined: {} } }}
      closeModal={() => {}}
    />,
    div,
  );
});
