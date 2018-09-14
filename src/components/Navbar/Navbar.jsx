import React from "react";
import Link from "react-router-dom/Link";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Fab from "../Fab/Fab";
import AnchorLink from "../AnchorLink/AnchorLink";

const SideMenu = styled.div`
  font-family: "Open Sans", sans-serif;
  font-display: swap;
  font-size: 2.5rem;
  position: fixed;
  display: flex;
  flex-direction: column;
  text-align: right;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 20px;
  background-color: #222222;
  top: 0;
  right: -320px;
  width: 320px;
  height: 100vh;
  transition: right 0.33s ease-out;
  z-index: 12;

  a {
    color: #b5bbbd;
    margin-bottom: 20px;
  }
`;
const SideMenuBackground = styled.div`
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 11;
`;

const CloseButton = styled.button`
  font-size: 2rem;
  color: beige;
  border: 0;
  transition: color 0.5s ease-in-out;
  background-color: transparent;
  z-index: 12;
  width: 100%;
  text-align: right;

  &:focus {
    outline-color: #b5bbbd;
  }

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    color: rgb(202, 131, 0);
  }
`;
const Navbar = ({ UIVisible }) => (
  <nav>
    <Fab aria-label={"Open Menu"} onClick={openSlideMenu} burger>
      <FontAwesomeIcon icon={faBars} />
    </Fab>

    <SideMenu id="side-menu">
      <CloseButton
        aria-label="close sidebar"
        onClick={closeSlideMenu}
      >
        <FontAwesomeIcon icon={faTimes} />
      </CloseButton>
      <Link to={"/"} style={{ marginTop: "50px" }}>
        Home
      </Link>
      {UIVisible && (
        <React.Fragment>
          <AnchorLink
            color={"#b5bbbd"}
            sectionId={"deck-filters"}
            callback={closeSlideMenu}
          >
            <p className="text-right">Filters</p>
          </AnchorLink>
          <AnchorLink
            color={"#b5bbbd"}
            sectionId={"deck-overview"}
            callback={closeSlideMenu}
          >
            <p className="text-right">Deck Overview</p>
          </AnchorLink>
          <AnchorLink
            color={"#b5bbbd"}
            sectionId={"dendrogram"}
            callback={closeSlideMenu}
          >
            <p className="text-right">History (visual)</p>
          </AnchorLink>
        </React.Fragment>
      )}
      <Link to={"/FAQ"}>FAQ</Link>
      <Link to={"/new-features"}>Νew Features</Link>
    </SideMenu>

    <SideMenuBackground id="side-menu-background" onClick={closeSlideMenu} />
  </nav>
);

Navbar.propTypes = {
  UIVisible: PropTypes.bool
}

Navbar.defaultProps = {
  UIVisible: false
}

export default Navbar;

const openSlideMenu = e => {
  document.getElementById("side-menu-background").style.display = "block";
  document.getElementById("side-menu").style.right = "0px";
};

const closeSlideMenu = e => {
  document.getElementById("side-menu-background").style.display = "none";
  document.getElementById("side-menu").style.right = "-320px";
};
