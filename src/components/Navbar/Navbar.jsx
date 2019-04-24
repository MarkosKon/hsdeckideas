import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import { Transition } from 'react-spring';
import { Fab, Button } from 'already-styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const FadedFab = styled(Fab)`
  &:hover {
    background-color: #0084b4;
  }

  &:focus {
    box-shadow: 0 0 0 0.3rem #63abc5;
  }
`;
const SideMenu = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  font-size: 2.5rem;
  flex-direction: column;
  text-align: right;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 20px;
  background-color: #222222;
  width: 320px;
  height: 100vh;
  z-index: 12;

  a {
    color: #b5bbbd;
    margin-bottom: 20px;
    text-decoration: none;
  }
`;
const SideMenuBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 11;
`;

const CloseButton = styled(Button)`
  border: 0;
  padding: 5px;
  width: 100%;
  text-align: right;
  transition: color 0.5s ease-in-out;

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
class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenuOpen: false,
    };

    this.openSlideMenu = this.openSlideMenu.bind(this);
    this.closeSlideMenu = this.closeSlideMenu.bind(this);
  }

  openSlideMenu() {
    this.setState({ mobileMenuOpen: true });
  }

  closeSlideMenu() {
    this.setState({ mobileMenuOpen: false });
  }

  render() {
    const { mobileMenuOpen } = this.state;
    return (
      <nav>
        <FadedFab
          aria-label="Open Menu"
          onClick={this.openSlideMenu}
          t="1%"
          r="3%"
          bc="#0084b471"
          w="60px"
          fs="24px"
          ripple={false}
        >
          <FontAwesomeIcon icon={faBars} />
        </FadedFab>

        <Transition
          items={mobileMenuOpen}
          from={{ transform: 'translateX(320px)', opacity: 0 }}
          enter={{ transform: 'translateX(0)', opacity: 1 }}
          leave={{ transform: 'translateX(320px)', opacity: 0 }}
        >
          {show => show
            && (({ transform, opacity }) => (
              <>
                <SideMenu style={{ transform }}>
                  <CloseButton
                    transparent
                    fs="50px"
                    c="beige"
                    aria-label="close sidebar"
                    onClick={this.closeSlideMenu}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </CloseButton>
                  <Link to="/" style={{ marginTop: '50px' }}>
                    Home
                  </Link>
                  <Link to="/faq/">FAQ</Link>
                  <Link to="/new-features/">Νew Features</Link>
                </SideMenu>
                <SideMenuBackground style={{ opacity }} onClick={this.closeSlideMenu} />
              </>
            ))
          }
        </Transition>
      </nav>
    );
  }
}
export default Navbar;
