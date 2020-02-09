import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
// core components
import { FontIcon } from "../Icons/FontIcon";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer";

/* eslint eqeqeq: 0*/
export class MainMenu extends Component {
  state = {
    openMenu: ""
  };
  printList({ prop, key }) {
    let openMenu = this.state.openMenu;

    let itsOpen = openMenu == prop.sidebarName;
    const iconName = itsOpen ? "fa-chevron-up" : "fa-chevron-down";
    return (
      <ListItem
        key={key}
        button
        onClick={() => {
          this.setState({
            openMenu: itsOpen ? "" : prop.sidebarName
          });
        }}
      >
        <ListItemIcon>
          {typeof prop.icon === "string" ? (
            <FontIcon iconName={`fa-${prop.icon}`} />
          ) : (
            <prop.icon />
          )}
        </ListItemIcon>
        <GridContainer>
          <GridItem xs={8}>
            <span>{prop.sidebarName}</span>
          </GridItem>
          {prop.parent ? (
            <GridItem xs={1}>
              <FontIcon iconName={iconName} />
            </GridItem>
          ) : (
            ""
          )}
        </GridContainer>
        {prop.parent && itsOpen ? this.loadChilds(prop.sidebarName) : ""}
      </ListItem>
    );
  }
  loadChilds(parentName) {
    let routes = this.props.routes;

    let child = routes.filter(item => item.childOf == parentName);
    return this.printMenu(child);
  }
  printMenu(routes) {
    return routes.map((prop, key) => {
      if (prop.redirect) return null;
      if (prop.hidden) return null;
      if (!prop.path) {
        prop.path = "/";
      }

      let path = prop.path.replace(/:[a-z]+/g, "");
      if (!prop.parent) {
        return (
          <NavLink to={path} activeClassName="active" key={key}>
            {this.printList({ prop, key })}
          </NavLink>
        );
      } else {
        return this.printList({ prop, key });
      }
    });
  }

  render = () => {
    const { routes } = this.props;
    const mainMenu = routes.filter(item => item.childOf == null);
    return <List>{this.printMenu(mainMenu)}</List>;
  };
}
