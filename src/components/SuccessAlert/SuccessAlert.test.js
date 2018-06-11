import React from "react";
import ReactDOM from "react-dom";
import SuccessAlert from "./SuccessAlert";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SuccessAlert />, div);
});
