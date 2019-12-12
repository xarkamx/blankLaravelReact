import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import { FontIcon } from "../Icons/FontIcon";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.jsx";
import "./scss/headers.scss";
import { SearchInput } from "../../views/Dashboard/SearchInput";

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    return (
      <main className={"customHeader"}>
        <GridContainer>
          <GridItem xs={12} md={8}>
            <SearchInput />
          </GridItem>
          <GridItem xs={12} md={3} style={{ textAlign: "center" }}>
            <Tooltip title="Salir">
              <IconButton
                style={{ marginTop: "2.2rem" }}
                onClick={() => {
                  localStorage.removeItem(btoa("token"));
                }}
              >
                <FontIcon
                  iconName="fa-sign-out-alt"
                  style={{ color: "#007777" }}
                />
              </IconButton>
            </Tooltip>
          </GridItem>
        </GridContainer>
      </main>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
