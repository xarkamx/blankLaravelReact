import React, { Component } from "react";
import { AsyncDataTable } from "./../../components/Table/AsycnDataTable";
import { FaButton } from "./../../components/CustomButtons/FaButton";
import {
  secondaryColor,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx";
import { UsersForm } from "./UsersForm";
export class UsersContainer extends Component {
  state = { id: "", open: false };
  render() {
    const { id, open } = this.state;
    return (
      <AsyncDataTable
        path={"api/user"}
        title={"Lista de usuarios"}
        subtitle={"permite ver,editar y eliminar usuarios"}
        titles={{
          name: "Nombre",
          email: "Correo",
          profileName: "Perfil",
          actions: "Acciones"
        }}
        inModal={
          <UsersForm
            id={id}
            submission={() => {
              this.setState({ id: "", open: false });
            }}
          />
        }
        modalOpen={open}
        onClose={() => {
          this.setState({ id: "", open: false });
        }}
        formatContent={item => {
          return [
            item.name,
            item.email,
            item.profileName,
            <>
              <FaButton
                icon="edit"
                style={{ color: secondaryColor, fontSize: "12px" }}
                onClick={() => {
                  this.setState({ id: item.id, open: true });
                }}
              />
              <FaButton
                icon="trash"
                style={{ color: dangerColor, fontSize: "12px" }}
              />
            </>
          ];
        }}
      ></AsyncDataTable>
    );
  }
}