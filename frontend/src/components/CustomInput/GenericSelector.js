import React, { Component } from "react";
import Select from "react-select";
import { Helpers } from "../../core/helpers";
import "./scss/inputs.scss";
/**
 * @description Componente que permite agregar un selector con buscador
 * @prop name @type string
 * @prop placeholder @type string
 * @prop title @type string
 * @prop value @type string
 * @prop onChange @type function
 * @return void
 */
/* eslint eqeqeq: 0*/
export class GenericSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "",
      error: false
    };
  }

  formatChildrenToOptions(children) {
    let options = [];
    children = children || [];
    children = this._formatChildren(children);
    children.map((map, key) => {
      let item = map.props;
      if (item == undefined) {
        return false;
      }
      options.push({ value: item.value, label: item.children });
      return options;
    });
    return options;
  }
  _formatChildren(children) {
    let formatedChildren = [];
    if (!Array.isArray(children)) {
      children = [children];
    }
    for (let item of children) {
      if (Array.isArray(item)) {
        formatedChildren = [...formatedChildren, ...item];
      } else {
        formatedChildren.push(item);
      }
    }
    return formatedChildren;
  }
  getDefaultValue(value, options) {
    const helpers = new Helpers();
    let defaultValue = helpers.searchByKey(options, "value", value);
    return defaultValue[0] || "";
  }
  onChange(ev) {
    const { onChange } = this.props;
    this.setState({ value: ev.value });
    if (typeof onChange == "function") {
      onChange(ev);
    }
  }
  setRequired(required) {
    let name = this.props.name || "GenericSelector";
    const input = this.refs.selector.querySelector(`[name="${name}"]`);
    input.type = "none";
    input.style.opacity = "0";
    input.style.height = "0px";
    input.style.position = "absolute";
    input.style.top = "0";
    input.required = required;
  }
  setValueOnProgramaticallyChange() {
    let name = this.props.name || "GenericSelector";
    const input = this.refs.selector.querySelector(`[name="${name}"]`);
    input.addEventListener("change", ev => {
      const { onChange } = this.props;
      this.setState({ value: ev.target.value });
      if (typeof onChange == "function") {
        onChange(ev.target);
      }
    });
  }
  componentWillUpdate(next) {
    if (next.value != this.state.value) {
      this.setState({ value: next.value });
    }
  }
  componentDidMount() {
    this.setRequired(this.props.required);
    this.setValueOnProgramaticallyChange();
  }
  render() {
    let { name, placeholder, title } = this.props;

    name = name || "GenericSelector";
    let value = this.state.value || this.props.value;
    placeholder = placeholder || "Selecciona uno...";

    let options = this.formatChildrenToOptions(this.props.children);
    value = this.getDefaultValue(value, options);

    return (
      <div className="form-group selector" ref="selector">
        <label className="control-label" htmlFor={name}>
          {title}
        </label>
        <Select
          name={name}
          placeholder={placeholder}
          id={name}
          value={value}
          onChange={this.onChange.bind(this)}
          options={options}
        />
        {this.state.error ? (
          <span style={{ color: "red" }}>Elemento Invalido</span>
        ) : (
          ""
        )}
      </div>
    );
  }
}
