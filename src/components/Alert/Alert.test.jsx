import React from 'react';
import ReactDOM from 'react-dom';
import Alert from './Alert';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Alert message="Test alert" callback={() => {}} style={{ transform: 'something' }} />,
    div,
  );
});
