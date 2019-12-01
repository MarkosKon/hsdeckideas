import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Nav = styled.nav`
  color: white;
  background-color: #0000001a;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  font-size: 18px;
  line-height: 1.1;
`;
const NavList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  & > li {
    margin-right: 16px;
  }
  & > li:last-child {
    margin-right: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
    font-family: 'Oswald', 'Open Sans', Arial, Helvetica, sans-serif;
  }
`;
export default () => {
  return (
    <Nav>
      <NavList>
        <li>
          <NavLink exact to="/" activeStyle={{ color: 'rgb(202,131,0)' }}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/edit-data/" activeStyle={{ color: 'rgb(202,131,0)' }}>
            Edit data
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/FAQ/" activeStyle={{ color: 'rgb(202,131,0)' }}>
            FAQ
          </NavLink>
        </li>
      </NavList>
    </Nav>
  );
};
