import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Centered } from "already-styled-components";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import UICard from "../../components/UICard/UICard";

const StyledUICard = styled(UICard)`
  padding: 50px 0 75px;
  font-size: 20px;
  a {
    text-decoration: none;
  }
`;
const Paragraphs = styled.p`
  text-align: left;
  margin: 10px 0;
`;
const NotFound = () => (
  <React.Fragment>
    <Header title="Page not found">
      <Navbar />
    </Header>
    <StyledUICard withHeader={false}>
      <Centered>
        <Paragraphs>
          Look, I don't want to blame anyone but it seems that you fucked up.
        </Paragraphs>
        <Paragraphs>
          The app has three pages. The <Link to="/"> main page </Link>
          the <Link to="/FAQ"> FAQ</Link> and the{" "}
          <Link to="/new-features"> New Features.</Link>
        </Paragraphs>
      </Centered>
    </StyledUICard>
    <Footer />
  </React.Fragment>
);

export default NotFound;
