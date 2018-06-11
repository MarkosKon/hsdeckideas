import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <header>
    <div className="header-content">
      <h1 className="text-center">Hearthstone Deck Ideas</h1>
      <div className="header-text text-center">
        <p>Press the button at the bottom right to generate a random deck.</p>
        <p>You can also select filters for the deck.</p>
        <p>
          If something is not clear see the <Link to="/FAQ"> FAQ.</Link>
        </p>
      </div>
    </div>
  </header>
);
