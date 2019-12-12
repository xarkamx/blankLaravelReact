import React, { Component } from "react";
import "./CustomSelect.scss";
import { FormControl } from "@material-ui/core";
import { Translator } from "../../../utils/Translator";
import { GenericSelector } from "../../CustomInput/GenericSelector";

export class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }
  handleChange = event => {
    this.setState({ value: event.value });
    if (typeof this.props.onChange === "function") {
      this.props.onChange(event.value);
    }
  };
  render() {
    const { labelText, name, selectProps, children, classes } = this.props;
    return (
      <FormControl className={`customSelect ${classes}`}>
        <GenericSelector
          name={name}
          title={new Translator(labelText).get()}
          onChange={this.handleChange}
          value={this.state.value}
          {...selectProps}
        >
          {children}
        </GenericSelector>
      </FormControl>
    );
  }
}
