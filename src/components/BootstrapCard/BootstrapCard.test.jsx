import React from "react";
import ReactDOM from "react-dom";
import BootstrapCard from "./BootstrapCard";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BootstrapCard/>, div);
});
