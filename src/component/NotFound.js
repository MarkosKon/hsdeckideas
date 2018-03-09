import React from "react";
import { Link } from "react-router-dom";
import { Panel } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";

const NotFound = () => {
  return (
    <div>
      <Header />
      <Panel bsStyle="danger" style={{ marginTop: 20 }}>
        <Panel.Heading>
          <Panel.Title
            componentClass="h2"
            className="text-center"
            style={{ fontSize: "30px" }}
          >
            Page not found :/
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <p className="text-center">
            The app has only two pages. The <Link to="/"> main page </Link>
            and the <Link to="/FAQ"> FAQ.</Link>
          </p>
        </Panel.Body>
      </Panel>
      <Footer />
    </div>
  );
};

export default NotFound;
