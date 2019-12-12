import React, { Component } from "react";
import "./qr.scss";
import { DOM } from "../../core/dom";
import { FontIcon } from "../Icons/FontIcon";
import IconButton from "@material-ui/core/IconButton";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.jsx";
import { FaButton } from "../CustomButtons/FaButton";
import { BaseQr } from "./BaseQr";
/* eslint eqeqeq: 0*/
/**
 * @description Componente que permite la generacion e impresion de QR
 * @props {string} data. Contenido del QR.
 */

export default class QR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || "",
      src: ""
    };
  }
  async componentWillReceiveProps(nextProps) {
    let value = nextProps.data;
    if (value != this.state.data) {
      await this.setState({ data: value });
    }
  }
  print = () => {
    new DOM();
    const qr = this.refs.qr;
    qr.print();
  };
  render() {
    return (
      <div className="qrContainer" style={this.props.style}>
        <div ref="qr">
          <BaseQr
            hash={this.state.data}
            onSRCLoad={src => {
              this.setState({ src });
            }}
            style={{
              maxWidth: "5.5cm",
              margin: "0 auto",
              display: "block"
            }}
          />
        </div>
        <GridContainer>
          <GridItem xs={4}>
            <FaButton icon="redo" onClick={this.props.onReload} />
          </GridItem>
          <GridItem xs={4}>
            <IconButton
              color="primary"
              aria-label="Download"
              variant="contained"
            >
              <a href={this.state.src} aria-label="Download" download>
                <FontIcon iconName="fa-download" />
              </a>
            </IconButton>
          </GridItem>
          <GridItem xs={4}>
            <FaButton icon="print" onClick={this.print} />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
