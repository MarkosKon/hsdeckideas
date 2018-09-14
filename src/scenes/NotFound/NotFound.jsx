import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import BootstrapCard from "../../components/BootstrapCard/BootstrapCard";

const StyleBootstrapCard = styled(BootstrapCard)`
  min-height: 30vh;
  font-size: 20px;

  .card-body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NotFound = () => (
  <React.Fragment>
    <Header title="Page not found">
      <Navbar />
    </Header>
    <StyleBootstrapCard className="mt-4" withHeader={false}>
      <p className="text-center">
        Look, I don't want to blame anyone but it seems that you fucked up.
      </p>
      <p className="text-center">
        The app has three pages. The <Link to="/"> main page </Link>
        the <Link to="/FAQ"> FAQ</Link> and the{" "}
        <Link to="/new-features"> New Features.</Link>
      </p>
    </StyleBootstrapCard>
    <Footer />
  </React.Fragment>
);

export default NotFound;
