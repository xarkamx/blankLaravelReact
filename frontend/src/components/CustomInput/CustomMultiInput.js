import React from "react";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
/* eslint eqeqeq: 0*/

export class CustomMultiInput extends React.Component {
  constructor(props) {
    super(props);
    this.copies = this.setCopies(props.value);
    this.state = { copies: this.copies.length - 1 };
  }
  setCopies(value) {
    if (value === "" || value == null) {
      return [""];
    }
    const values = Array.isArray(value) ? value : JSON.parse(value);
    return values;
  }
  addInput(ev) {
    this.setState({ copies: this.state.copies + 1 });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.state.value) {
      this.copies = this.setCopies(nextProps.value);
      this.setState({ copies: this.copies.length - 1 });
    }
  }
  onInputChange = (value, index) => {
    this.copies[index] = value;
  };
  printInputs() {
    const copies = this.state.copies;
    let inputs = [];
    inputs.push(this.printFirstInput());
    for (let index = 1; index <= copies; ++index) {
      inputs.push(this.printBasicInput(index));
    }
    return inputs;
  }
  printFirstInput() {
    const { labelText, id, inputProps, formControlProps } = this.props;
    inputProps.value = this.copies[0];
    return (
      <CustomInput
        key={0}
        labelText={labelText}
        id={id}
        value={this.copies[0]}
        onChange={ev => {
          this.onInputChange(ev.target.value, 0);
        }}
        onBlur={this.handleBlur}
        inputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={this.addInput.bind(this)}>
              <IconButton>
                <Add />
              </IconButton>
            </InputAdornment>
          ),
          ...inputProps
        }}
        formControlProps={formControlProps}
        onClick={this.addInput.bind(this)}
      />
    );
  }

  printBasicInput(index = 0) {
    const { labelText, id, inputProps, formControlProps } = this.props;
    inputProps.value = this.copies[index];
    return (
      <CustomInput
        key={Math.random()}
        labelText={labelText}
        id={id}
        value={this.copies[index]}
        onChange={ev => {
          this.onInputChange(ev.target.value, index);
        }}
        onBlur={this.handleBlur}
        inputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={() => {
                this.killInput(index);
              }}
            >
              <IconButton>
                <Close />
              </IconButton>
            </InputAdornment>
          ),
          ...inputProps
        }}
        formControlProps={formControlProps}
      />
    );
  }
  handleBlur = ev => {
    const { onChange } = this.props;
    if (typeof onChange === "function") {
      onChange(this.copies);
    }
  };
  killInput(key) {
    let filter = this.copies.filter((item, index) => {
      return index !== key;
    });
    this.copies = filter;
    this.setState({ copies: this.copies.length - 1 });
  }
  render() {
    return <div>{this.printInputs()}</div>;
  }
}
