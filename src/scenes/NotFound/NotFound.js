import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default () => (
  <div>
    <Header />
    <div className="panel panel-danger" style={{ marginTop: 20 }}>
      <div className="panel-heading">
        <h2 className="text-center panel-title" style={{ fontSize: "30px" }}>
          Page not found :/
        </h2>
      </div>
      <div className="panel-body">
        <p className="text-center">
          The app has only two pages. The <Link to="/"> main page </Link>
          and the <Link to="/FAQ"> FAQ.</Link>
        </p>
      </div>
    </div>
    <Footer />
  </div>
);
