import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <h1 className="text-center">Hearthstone Deck Ideas</h1>
        <div className="header-text text-center">
          <p>Press the button at the bottom right to generate a random deck.</p>
          <p>
            If something is not clear check the explanation area or see the
            <Link to="/FAQ"> FAQ.</Link>
          </p>
          <p>A random idea is already loaded for you. Check it out!</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
