import React from "react";
import ReactDOM from "react-dom";
import Footer from "./Footer";
import { MemoryRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Footer/>
    </Router>,
    div
  );
});
