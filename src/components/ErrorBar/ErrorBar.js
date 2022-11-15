import React, { Component } from "react";
import "./ErrorBar.scss";

class ErrorBar extends Component {
  render() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return <div />;
    }
    return (
      <div className="ErrorBar">
        <p>{errorMessage}</p>
      </div>
    );
  }
}

export default ErrorBar;
