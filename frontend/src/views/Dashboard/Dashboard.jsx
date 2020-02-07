import React, { Component } from "react";
import { ColorManager } from "../Colors/ColorManager";

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <ColorManager />
      </React.Fragment>
    );
  }
}
