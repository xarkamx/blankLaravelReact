import React, { Component } from "react";
import { PanelContainer } from "../../components/Panel/PanelContainer";
import Table from "components/Table/Table.jsx";
import { Switch } from "@material-ui/core";
import { AuthFetch } from "../../utils/AuthFetch";
import { Helpers } from "../../core/helpers";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Add, DeleteForever } from "@material-ui/icons";
import swal from "sweetalert";
import { Translator } from "../../utils/Translator";
import Fab from "@material-ui/core/Fab";
export class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      permissions: [],
      nProfile: ""
    };
    this.loadPermissions();
    this.loadProfiles();
  }
  async loadProfiles() {
    let fetch = new AuthFetch("api/profiles");
    let response = await fetch.get();
    this.setState({ profiles: response.data });
  }
  async loadPermissions() {
    const fetch = new AuthFetch(`api/permissions`);
    const response = await fetch.get();
    console.log(response.data);
    this.setState({ permissions: response.data });
  }
  /**
   *
   * @param Array profile
   * @param Array permissions
   * @return Component
   */
  printSwitch(profile, permissions) {
    const { id } = profile;
    const helpers = new Helpers();
    const profilePermissions = profile.permissions;

    return permissions.map((item, key) => {
      const find = helpers.searchByKey(profilePermissions, "name", item.name);
      let checked = find.length !== 0;
      return (
        <Switch
          checked={checked}
          onChange={() => {
            this.setPermission({
              profileID: id,
              permissionID: item.id,
              active: checked
            });
          }}
        />
      );
    });
  }
  /**
   *
   * @param Int permissionID
   * @param Boolean active
   */
  async setPermission({ profileID, permissionID, active }) {
    const fetch = new AuthFetch(`api/profiles/${profileID}/permissions`);
    if (active) {
      await fetch.delete({ permissionID });
    } else {
      await fetch.post({ permissionID });
    }
    this.loadProfiles();
  }
  async addProfile(name) {
    if (name === "") {
      return false;
    }
    const fetch = new AuthFetch("api/profiles");
    await fetch.post({ name });
    swal(
      new Translator("Saved").get(),
      new Translator("Sucess").get(),
      "success"
    );
    this.loadProfiles();
  }
  async deleteByID(name, id) {
    const fetch = new AuthFetch(`api/profiles/${id}`);
    let title = new Translator("Delete the profile").get();
    title = `${title}: ${name}`;
    const answer = await swal({
      text: new Translator(title).get(),
      icon: "warning",
      buttons: [
        new Translator("No, Thanks").get(),
        new Translator("Yes, Please").get()
      ],
      dangerMode: true
    });
    if (answer) {
      await fetch.delete();
      this.loadProfiles();
    }
  }
  render() {
    const { permissions, profiles, nProfile } = this.state;
    const titles = permissions.map(item => item.name);
    const tr = profiles.map(item => {
      return [
        item.name,
        ...this.printSwitch(item, permissions),
        <Fab
          key={Math.random()}
          color="secondary"
          size="small"
          className={"buttonMargin"}
          onClick={() => {
            return this.deleteByID(item.name, item.id);
          }}
        >
          <DeleteForever />
        </Fab>
      ];
    });
    return (
      <PanelContainer title="Profile" subtitle="Assign the permissions">
        <Table
          tableHeaderColor="primary"
          tableHead={["Perfil", ...titles, "Acciones"]}
          tableData={tr.reverse()}
        />
        <CustomInput
          key={Math.random()}
          labelText="Nuevo Perfil"
          formControlProps={{
            fullWidth: true
          }}
          value={nProfile}
          onBlur={ev => {
            const value = ev.target.value;
            this.addProfile(value);
            ev.target.value = "";
          }}
          inputProps={{
            onBlur: ev => {
              const value = ev.target.value;
              this.addProfile(value);
              this.setState({ nProfile: "" });
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Add />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </PanelContainer>
    );
  }
}
