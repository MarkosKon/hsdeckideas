import React from "react";
import ReactDOM from "react-dom";
import TreeDiagram from "./TreeDiagram";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TreeDiagram deck={{cards: [], history: {steps: []}}}/>, div);
});
