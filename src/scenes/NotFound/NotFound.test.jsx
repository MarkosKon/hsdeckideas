import React from "react";
import ReactDOM from "react-dom";
import NotFound from "./NotFound";
import { MemoryRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <NotFound />
    </Router>,
    div
  );
});
