import React from "react";
import ReactDOM from "react-dom";
import CRUDFilterModalContent from "./CRUDFilterModalContent";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<CRUDFilterModalContent/>, div);
});
