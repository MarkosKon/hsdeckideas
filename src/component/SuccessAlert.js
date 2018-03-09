import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import anime from "animejs";

class SuccessAlert extends Component {
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
          className="success-alert"
          bsStyle="success"
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
    anime
      .timeline()
      .add({
        targets: ".success-alert",
        translateY: ["-120%", 0],
        duration: 500
      })
      .add({
        targets: ".success-alert",
        translateY: [0, "-120%"],
        delay: 500,
        duration: 500,
        complete: anim => {
          this.setState({ alertVisible: false });
          this.props.listener();
        }
      });
  }

  handleAlertDismiss() {
    this.setState({ alertVisible: false });
  }

  handleAlertShow() {
    this.setState({ alertVisible: true });
  }
}

export default SuccessAlert;
