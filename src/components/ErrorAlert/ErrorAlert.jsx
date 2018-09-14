import React, { Component } from "react";
import anime from "animejs";
import PropTypes from "prop-types";
import Alert from "../Alert/Alert";

class ErrorAlert extends Component {
  constructor(props) {
    super(props);

    this.handleAlertShow = this.handleAlertShow.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);

    this.state = {
      alertVisible: true
    };
  }

  render() {
    const { message } = this.props;
    return this.state.alertVisible ? (
      <Alert className="alert alert-danger alert-dismissible" role="alert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={this.handleAlertDismiss}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <p>{message}</p>
      </Alert>
    ) : null;
  }

  componentDidMount() {
    anime({
      targets: ".alert-danger",
      translateX: ["-100%", 0],
      duration: 2000
    });
  }

  handleAlertDismiss() {
    this.setState({ alertVisible: false });
  }

  handleAlertShow() {
    this.setState({ alertVisible: true });
  }
}

ErrorAlert.propTypes = {
  message: PropTypes.string
};
ErrorAlert.defaultProps = {
  message: "An error has occurred"
};

export default ErrorAlert;
