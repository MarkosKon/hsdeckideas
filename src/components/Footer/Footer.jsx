import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebookF,
  faGithubAlt,
  faRedditAlien,
} from '@fortawesome/free-brands-svg-icons';

import pkg from '../../../package.json';

const FooterContainer = styled.footer`
  display: flex;
  width: 100%;
  min-height: 200px;
  color: rgba(255, 255, 255, 0.5);
  background-color: #222222;
  text-align: center;

  & ::-moz-selection {
    color: black;
  }
  & ::selection {
    color: black;
  }
`;

const FooterContent = styled.div`
  margin: 5vh auto;
`;

const LinkList = styled.ul`
  padding: 0;
`;

const LinkListItem = styled.li`
  font-size: 0.8em;
  display: inline;
  margin-right: 10px;
`;

const LinkListAnchor = styled(Link)`
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  -webkit-transition: all 0.35s;
  -moz-transition: all 0.35s;
  transition: all 0.35s;

  &:hover,
  &:active,
  &:focus {
    color: orange;
    text-decoration: none;
  }
`;

const SocialList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  list-style: none;
`;

const SocialListAnchor = styled.a`
  border-radius: 50%;
  font-size: 2.3rem;
  min-width: 4rem;
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  transition: all 0.35s;

  ${({ twitter }) => twitter
    && `
    color: white;
    background-color: #00aced;

    &:hover,
    &:active,
    &:focus {
      color: whitesmoke;
      background-color: #0084b4;
    }
  `};

  ${({ facebook }) => facebook
    && `
    color: white;
    background-color: #3b5998;

    &:hover,
    &:active,
    &:focus {
      color: whitesmoke;
      background-color: rgb(42, 66, 117);
    }
  `};
  ${({ reddit }) => reddit
    && `
    color: white;
    background-color: #ff4500;

    &:hover,
    &:active,
    &:focus {
      color: whitesmoke;
      background-color: #c5400f;
    }
  `};
  ${({ github }) => github
    && `
    color: black;
    background-color: whitesmoke;

    &:hover,
    &:active,
    &:focus {
      color: black;
      background-color: rgb(197, 197, 197);
    }
  `};
`;

SocialListAnchor.propTypes = {
  twitter: PropTypes.bool,
  facebook: PropTypes.bool,
  reddit: PropTypes.bool,
  github: PropTypes.bool,
};

SocialListAnchor.defaultProps = {
  twitter: false,
  facebook: false,
  reddit: false,
  github: false,
};

const Footer = () => (
  <FooterContainer>
    <FooterContent>
      <div>
        <span> v</span>
        {pkg.version}
      </div>
      <LinkList>
        <LinkListItem>
          <LinkListAnchor
            to="//mkdevdiary.netlify.com/contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </LinkListAnchor>
        </LinkListItem>
        <LinkListItem>
          <LinkListAnchor to="/faq">FAQ</LinkListAnchor>
        </LinkListItem>
      </LinkList>
      <SocialList>
        <li>
          <SocialListAnchor
            href="https://twitter.com/HsDeckIdeas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="twitter link"
            twitter
          >
            <FontAwesomeIcon icon={faTwitter} />
          </SocialListAnchor>
        </li>
        <li>
          <SocialListAnchor
            href="https://www.facebook.com/hsdeckideas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="facebook link"
            facebook
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </SocialListAnchor>
        </li>
        <li>
          <SocialListAnchor
            href="https://github.com/MarkosKon/hsdeckideas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="github link"
            github
          >
            <FontAwesomeIcon icon={faGithubAlt} />
          </SocialListAnchor>
        </li>
        <li>
          <SocialListAnchor
            href="https://www.reddit.com/r/hearthstone/comments/80zjvh/random_deck_generator_build_the_meme_deck_you/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="reddit link"
            reddit
          >
            <FontAwesomeIcon icon={faRedditAlien} />
          </SocialListAnchor>
        </li>
      </SocialList>
      <p>2019 Markos Konstantopoulos</p>
      <p>
        All Hearthstone assets on this site are property of Blizzard Entertainment
        <sup>&reg;</sup>
      </p>
    </FooterContent>
  </FooterContainer>
);

export default Footer;
