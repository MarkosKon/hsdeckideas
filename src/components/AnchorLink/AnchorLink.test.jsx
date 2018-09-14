import React from "react";
import ReactDOM from "react-dom";
import AnchorLink from "./AnchorLink";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AnchorLink/>, div);
});
