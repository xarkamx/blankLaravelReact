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
        <ToolBar>
          <>{this.props.extraButtons}</>
          <strong
            style={{
              padding: "12px",
              fontSize: "1.3rem",
              textTransform: "full-width capitalize",
              display: "block"
            }}
          >
            {this.props.name}
          </strong>
          <SearchInput />
          <Tooltip title="Salir">
            <IconButton
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
        </ToolBar>
      </main>
    );
  }
}
function ToolBar({ children, sizes = [2, 8, 1, 1] }) {
  return (
    <GridContainer>
      {children.map((item, key) => {
        if (!sizes[key]) {
          sizes[key] = 1;
        }
        return (
          <GridItem xs={sizes[key]} key={key}>
            {item}
          </GridItem>
        );
      })}
    </GridContainer>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
