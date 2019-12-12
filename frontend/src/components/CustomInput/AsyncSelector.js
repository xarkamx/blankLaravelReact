import React, { Component } from "react";
import { GenericSelector } from "./GenericSelector";
import { AuthFetch } from "../../utils/AuthFetch";
import { optionalFn } from "../../core/helpers";
/**
 * Obtiene valores desde un endpoint
 * @param {function} formatOptions({value,title});
 */
export class AsyncSelector extends Component {
  state = { content: [], value: "" };
  async loadData() {
    const { path, args } = this.props;
    const fetch = new AuthFetch(path);
    let content = (await fetch.get(args)).data;
    this.setState({ content });
  }
  componentDidMount() {
    this.loadData();
  }
  render() {
    const { onChange, path, formatOptions, children, ...rest } = this.props;
    return (
      <GenericSelector
        onChange={ev => {
          this.setState({ value: ev.value });
          optionalFn(onChange)(ev, this.state.content, path);
        }}
        value={this.state.value}
        {...rest}
      >
        {this.state.content.map(item => {
          /**
           * @description en base a la respuesta del request permite formatear lo que se imprimira en options
           */
          item = formatOptions(item);
          return item ? <option value={item.value}>{item.title}</option> : "";
        })}
      </GenericSelector>
    );
  }
}
