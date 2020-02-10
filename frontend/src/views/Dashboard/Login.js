import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { AjaxForm } from "../../components/Containers/AjaxForm";
import "./scss/login.scss";
import { LoginManager } from "../../utils/LoginManager";

import logo from "assets/img/favicon.png";
import { SimpleInput } from "../../components/CustomInput/SimpleInput";
import { FaButton } from "../../components/CustomButtons/FaButton";
import { ActionInput } from "../../components/CustomInput/ActionInput";
import { FontIcon } from "../../components/Icons/FontIcon";
import { Version } from "../../components/Prints/Version";
import {
  primaryColor,
  shadowColor,
  fontColor
} from "assets/jss/material-dashboard-react.jsx";

export class Login extends React.Component {
  state = { type: "password" };
  onSubmit(result) {
    const logged = this.props.onLogin;
    let token = new LoginManager().login(result).getToken();
    if (typeof logged !== "function") {
      throw new Error("on Login Props its needed");
    }
    return logged(token);
  }
  render() {
    const { type } = this.state;
    let typeState = type === "password";
    return (
      <div className="loginBackground">
        <div
          className={"login"}
          style={{
            background: primaryColor,
            boxShadow: `5px 7px 8px ${shadowColor}`
          }}
        >
          <CssBaseline />
          <Paper className={"paper"}>
            <Avatar className={"avatar"}>
              <img src={logo} alt={"DEVGDL"} style={{ width: "100%" }} />
            </Avatar>
            <Typography
              style={{
                color: fontColor,
                textShadow: "1px 1px 1px black",
                textAlign: "center"
              }}
              component="h1"
              variant="h5"
            >
              DEVGDL
            </Typography>
            <AjaxForm
              autoload={false}
              path="/api/auth/login"
              method="post"
              submitted={this.onSubmit.bind(this)}
            >
              <SimpleInput
                title="Email"
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                style={{ color: "black" }}
                value=""
              />
              <ActionInput
                disableEnter
                icon={
                  <FontIcon
                    iconName={`fa-eye${typeState ? "" : "-slash"}`}
                    style={{ color: "ligthgray" }}
                  />
                }
                onClick={val => {
                  this.setState({
                    type: typeState ? "text" : "password"
                  });
                  return val;
                }}
                title="Contraseña "
                name="password"
                type={type}
                id="password"
                autoComplete="current-password"
                style={{ color: "black" }}
                value=""
              />

              <Version />
              <FaButton
                aria-label="Ingresar"
                type="submit"
                size="14px"
                fullWidth
                icon="sign-in-alt"
                className={"submit"}
                background={primaryColor}
                style={{
                  color: "white",
                  textShadow: "1px 1px 1px black",
                  width: "100%"
                }}
              >
                Ingresar
              </FaButton>
            </AjaxForm>
          </Paper>
        </div>
      </div>
    );
  }
}
