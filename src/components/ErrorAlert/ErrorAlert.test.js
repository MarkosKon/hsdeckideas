import React from "react";
import ReactDOM from "react-dom";
import ErrorAlert from "./ErrorAlert";

it("renders without crashing no message", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ErrorAlert />, div);
});

it("renders without crashing with message", () => {
  const div = document.createElement("div");
  const message = "Hello world!"
  ReactDOM.render(<ErrorAlert message={message}/>, div);
});
