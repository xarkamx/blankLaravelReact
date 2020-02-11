import React, { Component } from "react";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

export class PermissionCard extends Component {
  render() {
    const { name } = this.props;
    return (
      <Card>
        <CardBody>
          <h3 style={{ textAlign: "center" }}>{name}</h3>
        </CardBody>
      </Card>
    );
  }
}
