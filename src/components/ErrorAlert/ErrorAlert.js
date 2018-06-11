import React, { Component } from "react";
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
        <div className="alert alert-danger alert-dismissible" role="alert">
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
      </div>
      );
    } else {
      return null;
    }
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

export default ErrorAlert;
