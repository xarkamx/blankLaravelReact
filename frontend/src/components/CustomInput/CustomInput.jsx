import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";
import { Translator } from "../../utils/Translator";
export class CustomInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value || "" };
  }
  onChange(ev) {
    let value = ev.target.value;
    if (this.props.readOnly === true) {
      return false;
    }
    let result;
    const { onChange } = this.props;
    if (typeof onChange === "function") {
      result = onChange(ev);
    }
    value = typeof result === "string" ? result : value;
    this.setState({ value });
  }
  componentWillReceiveProps(next) {
    if (next.value !== this.state.value) {
      this.setState({ value: next.value });
    }
  }
  render() {
    const {
      classes,
      formControlProps,
      labelText,
      id,
      labelProps,
      inputProps,
      error,
      success
    } = this.props;

    const labelClasses = classNames({
      [" " + classes.labelRootError]: error,
      [" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = classNames({
      [classes.underlineError]: error,
      [classes.underlineSuccess]: success && !error,
      [classes.underline]: true
    });
    const marginTop = classNames({
      [classes.marginTop]: labelText === undefined
    });
    return (
      <main>
        <FormControl
          {...formControlProps}
          className={`${formControlProps.className}  ${classes.formControl} ${
            this.props.className
          }`}
        >
          {labelText !== undefined ? (
            <InputLabel
              className={classes.labelRoot + labelClasses}
              htmlFor={id}
              {...labelProps}
            >
              {new Translator(labelText).get()}
            </InputLabel>
          ) : null}
          <Input
            classes={{
              root: marginTop,
              disabled: classes.disabled,
              underline: underlineClasses
            }}
            id={id}
            onChange={this.onChange.bind(this)}
            onBlur={this.props.onBlur}
            {...inputProps}
            aria-describedby={new Translator(labelText).get()}
            value={this.state.value}
          />
          {error ? (
            <Clear
              className={classes.feedback + " " + classes.labelRootError}
            />
          ) : success ? (
            <Check
              className={classes.feedback + " " + classes.labelRootSuccess}
            />
          ) : null}
        </FormControl>
      </main>
    );
  }
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomInput);
