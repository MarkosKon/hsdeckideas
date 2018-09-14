import React from "react";
import ReactDOM from "react-dom";
import FAQ from "./FAQ";
import { MemoryRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router initialEntries={["/FAQ"]}>
      <FAQ />
    </Router>,
    div
  );
});
