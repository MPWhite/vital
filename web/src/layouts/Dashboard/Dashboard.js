import React, { Component } from "react";
import "./Dashboard.scss";
import "react-widgets/dist/css/react-widgets.css";

class Dashboard extends Component {
  render() {
    const { exploGroupToken } = this.props;
    return (
      <div className="Dashboard">
        <div className="Dashboard__container"></div>
      </div>
    );
  }
}

export default Dashboard;
