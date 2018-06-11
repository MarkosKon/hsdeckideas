import React, { Component } from "react";

export default class CRUDFilterModalContent extends Component {
  render() {
    return (
      <div
        className="panel"
        style={{
          margin: "0",
          minHeight: "70vh",
          // minWidth: "70vw",
          paddingTop: "30px"
        }}
      >
        <div className="panel-heading">
          <h2>This the CRUD Filters for card Modal</h2>
        </div>
        <div className="panel-body">
          <span
            className="close"
            style={{ position: "absolute", top: "5px", right: "10px" }}
            onClick={this.props.listenerCM}
          >
            &times;
          </span>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </div>
      </div>
    );
  }
}
