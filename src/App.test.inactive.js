import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MemoryRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
    global.localStorage = new LocalStorageMock();
  ReactDOM.render(
    <Router initialEntries={["/"]}>
      <App />
    </Router>,
    div
  );
});

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
