import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://markon.herokuapp.com#contact"
            >
              Contact
            </a>
          </li>
          <li>
            <Link to="/FAQ">FAQ</Link>
          </li>
        </ul>
        <p>2018 Markos Konstantopoulos.</p>
        <p>All images are property of Blizzard Entertainment<sup>&reg;</sup></p>
      </div>
    </footer>
  );
};

export default Footer;
