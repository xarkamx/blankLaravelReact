import React from "react";
import { AjaxForm } from "../../components/Containers/AjaxForm";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { PanelContainer } from "../../components/Panel/PanelContainer";
import { Button } from "@material-ui/core";
import { Translator } from "../../utils/Translator";
import swal from "sweetalert";
import { AuthFetch } from "../../utils/AuthFetch";
import { ProfileSelector } from "../Profiles/ProfileSelector";

export class UsersForm extends React.Component {
  constructor() {
    super();
    this.state = {
      mailError: false,
      email: "",
      password: "",
      profileID: ""
    };
  }
  _willSubmit(inputs) {
    const { password, checkPassword } = inputs;
    if (password !== checkPassword) {
      swal("Oops", new Translator("Check Password").get(), "error");
      return false;
    }
    if (typeof inputs.profileID === "undefined") {
      swal(
        "Oops",
        new Translator("Tipo de usuario es obligatorio").get(),
        "error"
      );
      return false;
    }
    return inputs;
  }
  _setToArray(value) {
    return typeof value === "object" ? value : [value];
  }
  _afterSubmit(inputs, jsx) {
    const submission = this.props.submission;
    if (typeof submission === "function") {
      return submission(inputs, jsx);
    }
  }
  _fillForm = inputs => {
    this.setState(inputs.data);
  };
  async onMailBlur(ev) {
    const auth = new AuthFetch("/api/users");
    const mail = ev.target.value;
    const users = await auth.get({ search: mail });
    if (this.state.email === mail) {
      return false;
    }
    if (users.data.length > 0) {
      swal("Opps", new Translator("Existing Mail").get(), "error");
      this.setState({
        mailError: true,
        email: ""
      });
    } else {
      this.setState({
        mailError: false,
        email: mail
      });
    }
  }
  render() {
    let personID = this.props.personID || "";
    const { email, mailError, password, profileID } = this.state;
    return (
      <AjaxForm
        path={`/api/persons/${personID}/user`}
        autoload={personID !== ""}
        method="post"
        willSubmit={this._willSubmit.bind(this)}
        submitted={this._afterSubmit.bind(this)}
        getter={this._fillForm}
      >
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <PanelContainer title="User" subtitle="Fill the Form">
              <GridItem xs={12} sm={12} md={12}>
                <ProfileSelector
                  value={profileID}
                  onChange={ev => {
                    this.setState({ profileID: ev.value });
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Email Address"
                  id="email-address"
                  error={mailError}
                  value={email}
                  onChange={({ target }) => {
                    this.setState({ email: target.value });
                  }}
                  inputProps={{
                    name: "email",
                    type: "email",
                    required: true,
                    onBlur: this.onMailBlur.bind(this),
                    autoComplete: "off"
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Password"
                  id="password"
                  value={password}
                  inputProps={{
                    name: "password",
                    type: "password",
                    required: true
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={({ target }) => {
                    this.setState({ password: target.value });
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Validate Password"
                  id="validate-password"
                  value=""
                  inputProps={{
                    name: "checkPassword",
                    type: "password",
                    required: true
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={"submit"}
              >
                {new Translator("Save").get()}
              </Button>
            </PanelContainer>
          </GridItem>
        </GridContainer>
      </AjaxForm>
    );
  }
}
