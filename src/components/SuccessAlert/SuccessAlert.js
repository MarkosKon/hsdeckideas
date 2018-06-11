import React, { Component } from "react";
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
    if (this.state.alertVisible)
      return (
        <div className="alert alert-success alert-dismissible" role="alert">
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
    return null;
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

  handleAlertDismiss() {
    this.setState({ alertVisible: false });
  }

  handleAlertShow() {
    this.setState({ alertVisible: true });
  }
}

export default SuccessAlert;
