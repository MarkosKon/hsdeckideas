import React from "react";
import ReactDOM from "react-dom";
import ProgressBar from "./ProgressBar";
import { MemoryRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ProgressBar/>, div);
});
