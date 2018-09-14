import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Tooltip from "./Tooltip";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Tooltip />, div);
});
