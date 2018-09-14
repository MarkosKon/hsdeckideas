import React from "react";
import ReactDOM from "react-dom";
import Filters from "./Filters";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Filters 
      heroes={[]}
      archetypes={[]}
      interestingCards={[]}
      nonInterestingCards={[]}
      selectInterestingCards={[]}
      selectNonInterestingCards={[]}
       />
  , div);
});
