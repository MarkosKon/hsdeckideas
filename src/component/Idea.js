import React from "react";

const Idea = props => {
  return (
    <div id="resultArea" className="row">
      {props.idea ? (
        <div className="thumbnail">
          <h2 className="text-center">Idea</h2>
          <div id="result" className="well text-center">
            {props.idea}
          </div>
          <div style={{ marginLeft: "5px" }}>
            <sup>
              * if the idea is not clear, check the explanation area for
              details!
            </sup>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Idea;
