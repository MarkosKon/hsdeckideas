import React, { Component } from "react";
import anime from "animejs";
import PropTypes from "prop-types";
import Alert from "../Alert/Alert";

class SuccessAlert extends Component {
  constructor(props) {
    super(props);

    this.handleAlertShow = this.handleAlertShow.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);

    this.state = {
      alertVisible: true
    };
  }

  componentDidMount() {
    anime
      .timeline()
      .add({
        targets: ".alert-success",
        translateY: ["-120%", 0],
        duration: 500
      })
      .add({
        targets: ".alert-success",
        translateY: [0, "-120%"],
        delay: 1000,
        duration: 500,
        complete: anim => {
          this.setState({ alertVisible: false });
          this.props.listener();
        }
      });
  }

  render() {
    return this.state.alertVisible ? (
      <Alert className="alert alert-success alert-dismissible" role="alert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={this.handleAlertDismiss}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <p>{this.props.message}</p>
      </Alert>
    ) : null;
  }

  handleAlertDismiss() {
    this.setState({ alertVisible: false });
  }

  handleAlertShow() {
    this.setState({ alertVisible: true });
  }
}

SuccessAlert.propTypes = {
  message: PropTypes.string
};
SuccessAlert.defaultProps = {
  message: "Operation was successful"
};

export default SuccessAlert;
