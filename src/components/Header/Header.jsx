import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ProgressiveImage from "react-progressive-bg-image";
import imageSmall from "../../images/boomsday-blur.jpg";
import imageFull from "../../images/boomsday.jpg";

const StyledHeader = styled(ProgressiveImage)`
  margin: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: beige;
  height: 60vh !important;
  display: flex;
  align-items: center;
  justify-content: center;
  color: beige;
  text-align: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

  h1 {
    font-size: 5rem;
    margin-bottom: 2rem;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 10px;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 7px;
  }

  a {
    color: orange;
    transition: color 0.5s ease-in-out;
  }

  span {
    color: black;
    padding: 5px;
    font-size: 28px;
    border-radius: 8px;
    display: inline-block;
  }

  p:nth-child(2) > span {
    background-color: burlywood;
  }
  p:nth-child(3) > span {
    background-color: bisque;
  }
  p:nth-child(4) > span {
    background-color: beige;
  }

  & a:hover,
  & a:focus,
  & a:active {
    text-decoration: none;
    color: rgb(202, 131, 0);
  }
  & ::-moz-selection {
    color: black;
  }
  & ::selection {
    color: black;
  }

  @media (max-width: 767px) {
    min-height: 100vh;
  }
`;

const HeaderContent = styled.div`
  padding: 0 5px;
  font-family: "Open Sans", sans-serif;
  @media (max-width: 767px) {
    & h1 {
      font-size: 3rem;
      margin-bottom: 2rem;
    }
    & span {
      font-size: 1.4rem;
    }
  }
`;

const stringToParagraph = (string, index) => (
  <p key={index}>
    <span>{string}</span>
  </p>
)

const Header = ({ title, paragraphs, children }) => (
  <StyledHeader
    src={imageFull}
    placeholder={imageSmall}
    component={"header"}
    opacity={1}
    blur={0}
    transition="all .30s linear"
  >
    <HeaderContent>
      <h1 className="text-center">{title}</h1>
      {paragraphs && paragraphs.map(stringToParagraph)}
    </HeaderContent>
    {children}
  </StyledHeader>
);

Header.propTypes = {
  title: PropTypes.string,
  paragraphs: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.element
};
Header.defaultProps = {
  title: "Header title",
  paragraphs: null
};

export default Header;
