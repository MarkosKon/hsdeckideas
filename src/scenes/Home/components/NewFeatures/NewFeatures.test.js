import React from "react";
import ReactDOM from "react-dom";
import NewFeatures from "./NewFeatures";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NewFeatures />, div);
});
