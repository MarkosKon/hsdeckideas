import React from "react";
import ReactDOM from "react-dom";
import HoverImage from "./HoverImage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<HoverImage />, div);
});
