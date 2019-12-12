import React, { Component } from "react";
import "./image.scss";
import { insteadIMG } from "../../utils/Utils";
/* eslint eqeqeq: 0*/
export class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: insteadIMG(props.src)
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.src != prevState.src) {
      return {
        src: insteadIMG(nextProps.src)
      };
    }
    return prevState;
  }
  render() {
    const src = this.state.src;
    const type = this.props.type || "fullscreen";
    const style = this.props.style;
    const path = `url(${src})`;
    return (
      <div
        className={`image ${type}`}
        style={{
          backgroundImage: path,
          ...style
        }}
      />
    );
  }
}
