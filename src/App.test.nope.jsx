import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import App from './App';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  global.localStorage = new LocalStorageMock();
  ReactDOM.render(
    <Router initialEntries={['/']}>
      <App />
    </Router>,
    div,
  );
});
