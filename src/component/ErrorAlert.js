import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import anime from "animejs";

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
    if (this.state.alertVisible) {
      return (
        <Alert
          className="error-alert"
          bsStyle="danger"
          onDismiss={this.handleAlertDismiss}
        >
          <p>{this.props.message}</p>
        </Alert>
      );
    } else {
      return null;
    }
  }

  componentDidMount() {
    anime({
      targets: ".error-alert",
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

export default ErrorAlert;
