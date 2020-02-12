import React, { useState } from "react";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import "./scss/groupInput.scss";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { optionalFn } from "../../core/helpers";

/* eslint eqeqeq: 0*/
export class act extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ""
    };
  }
  componentWillReceiveProps(nextProps) {
    let value = nextProps.value;
    if (value != this.state.value && value != "") {
      this.setState({ value });
    }
  }
  handleClick = () => {
    const onClick = this.props.onClick;
    if (typeof onClick === "function") {
      let response = onClick(this.state.value);
      this.setState({ value: response });
      return response;
    }
  };
  onChange = ev => {
    const value = ev.target.value;
    this.setState({ value });
    optionalFn(this.props.onChange)(ev);
  };
  _handleKeyPress = e => {
    if (this.props.disableEnter) {
      return false;
    }
    if (e.key === "Enter") {
      this.handleClick();
    }
  };
  render() {
    const {
      title,
      icon,
      className,
      onBlur,
      id,
      type,
      style,
      name
    } = this.props;
    const { value } = this.state;
    return (
      <CustomInput
        labelText={title}
        value={value}
        onChange={this.onChange}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          onKeyPress: this._handleKeyPress,
          id,
          type,
          style,
          name,
          endAdornment: (
            <InputAdornment onClick={this.handleClick} position="end">
              <IconButton aria-label="Search">{icon}</IconButton>
            </InputAdornment>
          ),
          className: className,
          onBlur: onBlur
        }}
      />
    );
  }
}
export function ActionInput({
  title,
  value,
  onClick,
  onChange,
  disableEnter,
  id,
  type,
  style,
  name,
  icon,
  className,
  onBlur
}) {
  const [val, setVal] = useState(value);
  const handleClick = () => {
    if (typeof onClick === "function") {
      let response = onClick(val);
      return response;
    }
  };
  const handleChange = ev => {
    const value = ev.target.value;
    setVal(value);
    optionalFn(onChange)(ev);
  };
  const _handleKeyPress = e => {
    if (disableEnter) {
      return false;
    }
    if (e.key === "Enter") {
      handleClick();
    }
  };
  return (
    <CustomInput
      labelText={title}
      value={val}
      onChange={handleChange}
      formControlProps={{
        fullWidth: true
      }}
      inputProps={{
        onKeyPress: _handleKeyPress,
        id,
        type,
        style,
        name,
        endAdornment: (
          <InputAdornment onClick={handleClick} position="end">
            <IconButton aria-label="Search">{icon}</IconButton>
          </InputAdornment>
        ),
        className: className,
        onBlur: onBlur
      }}
    />
  );
}
