import React from "react";
import ReactDOM from "react-dom";
import Info from "./Info";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Info 
      hero={null}
      archetype={null}
      originCards={[]}
      otherCards={[]}
    />
  , div);
});
