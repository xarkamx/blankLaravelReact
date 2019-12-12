import React, { Component } from "react";
import "./CustomSwitchAccess.scss";
import { Switch, FormControlLabel } from "@material-ui/core";
import { Persons } from "../../utils/Controller/Persons";
import { optionalFn } from "../../core/helpers";

export class CustomSwitchAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAccess: props.hasAccess === 1,
      validity: props.expirationDate
    };
  }
  async handleAccess(ev) {
    const checked = ev.target.checked;
    const id = this.props.id;
    const persons = new Persons(id);
    persons.setAccess(checked);
    const tomorrow = new Date();
    optionalFn(this.props.onChange)(tomorrow);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.setState({
      hasAccess: checked,
      validity: tomorrow
    });
  }
  canAccess(validity, hasAccess) {
    const diffDate = new Date(validity) - new Date();
    if (validity == null || !hasAccess) {
      return hasAccess;
    }
    return diffDate > 0;
  }
  render() {
    const { hasAccess, validity } = this.state;
    const access = this.canAccess(validity, hasAccess);
    let title = access ? "Con Acceso" : "Sin Acceso";

    return (
      <FormControlLabel
        className="customSwitch"
        control={
          <Switch
            onChange={this.handleAccess.bind(this)}
            checked={access}
            color="primary"
          />
        }
        label={title}
      />
    );
  }
}
