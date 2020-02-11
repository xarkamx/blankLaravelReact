import React, { Component } from "react";
import GridContainer from "components/Grid/GridContainer";
import { AuthFetch } from "../../utils/AuthFetch";
import { PermissionCard } from "./PermissionCard";
import GridItem from "components/Grid/GridItem.jsx";
import "./scss/Permissions.scss";
export class PermissionSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: []
    };
    this.loadPermissions();
  }
  async loadPermissions() {
    const fetch = new AuthFetch(`api/permissions`);
    const response = await fetch.get();
    this.setState({ permissions: response.data });
  }
  /**
   *
   * @param {array} permissions
   */
  printPermissions(permissions) {
    const components = permissions.map((permission, key) => (
      <GridItem xs={6} md={3}>
        <PermissionCard key={key} {...permission} />
      </GridItem>
    ));
    return components;
  }
  render() {
    const { permissions } = this.state;
    return (
      <main className="permissionSelector">
        <GridContainer justify="center">
          {this.printPermissions(permissions)}
        </GridContainer>
      </main>
    );
  }
}
