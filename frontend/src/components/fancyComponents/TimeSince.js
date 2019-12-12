import React, { Component } from "react";
import { Helpers } from "./../../core/helpers";
export class TimeSince extends Component {
  state = {
    timeSince: "0.0s"
  };
  componentDidMount() {
    this.setTime();
    this.interval = setInterval(() => {
      this.setTime();
    }, 60 * 1000);
  }
  setTime() {
    const helpers = new Helpers();
    const timePassed = helpers.getTimePassed(this.props.timeSince);
    const { days, hours, mins } = timePassed;
    this.setState({
      timeSince: `${days} días ${hours} horas ${mins} minutos `
    });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { timeSince } = this.state;
    return <span>{timeSince}</span>;
  }
}
