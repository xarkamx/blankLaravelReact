/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Footer from "components/Footer/Footer.jsx";

import { DashboardRoutes } from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import "assets/scss/main.scss";
import { MainContainer } from "./MainContainer";
import { ColorsUtilities } from "./../../utils/ColorsUtilities";
import { LoginManager } from "../../utils/LoginManager";
import { Login } from "../../views/Dashboard/Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      logged: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  async setLoginStatus() {
    const loginManager = new LoginManager();
    if (loginManager.isLogged()) {
      this.setState({ logged: true });
    }
    await loginManager.onLoginExpire();
    this.setState({ logged: false });
  }
  handleRoutes = () => {
    const dashboardRoutes = new DashboardRoutes().get();
    return (
      <Switch>
        {dashboardRoutes.map((prop, key) => {
          if (prop.redirect && this.props.location.pathname == prop.path) {
            return <Redirect from={prop.path} to={prop.to} key={key} />;
          }
          if (!prop.component) {
            return null;
          }
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        })}
      </Switch>
    );
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname;
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  componentDidMount() {
    new ColorsUtilities().getRemoteColors();
    this.setLoginStatus();
    if (navigator.platform.indexOf("Win") > -1) {
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  render() {
    const { classes, ...rest } = this.props;
    console.log(this.state.logged);
    if (!this.state.logged)
      return <Login onLogin={this.setLoginStatus.bind(this)} />;
    const routes = new DashboardRoutes().get();
    return (
      <div>
        <main>
          <div ref="mainPanel">
            <MainContainer routes={routes} path={this.getRoute()}>
              <div className={classes.content + " appContainer"}>
                <div className={classes.container}>{this.handleRoutes()}</div>
              </div>
              <Footer />
            </MainContainer>
          </div>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(App);
