import React from "react";
import { Link } from "react-router-dom";

export default () => (
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
      <ul className="social">
        <li className="social-twitter">
          <a
            href="https://twitter.com/HsDeckIdeas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="twitter"
          >
            <i className="fab fa-twitter" />
          </a>
        </li>
        <li className="social-facebook">
          <a
            href="https://www.facebook.com/Hearthstone-Deck-Ideas-428432344237100"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="facebook"
          >
            <i className="fab fa-facebook-f" />
          </a>
        </li>
        <li className="social-reddit">
          <a
            href="https://www.reddit.com/r/hearthstone/comments/80zjvh/random_deck_generator_build_the_meme_deck_you/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="reddit"
          >
            <i className="fab fa-reddit-alien" />
          </a>
        </li>
      </ul>
      <p className="text-center">2018 Markos Konstantopoulos</p>
      <p>
        All Hearthstone assets on this site are property of Blizzard
        Entertainment<sup>&reg;</sup>
      </p>
    </div>
  </footer>
);
