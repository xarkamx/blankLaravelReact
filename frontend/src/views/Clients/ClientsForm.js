import React, { useState } from "react";
import { CameraView } from "../../components/UploaderInputs/CameraView";
import { SimpleInput } from "./../../components/CustomInput/SimpleInput";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.jsx";
import { AjaxForm } from "./../../components/Containers/AjaxForm";
import { PanelContainer } from "./../../components/Panel/PanelContainer";
import { CustomMultiInput } from "./../../components/CustomInput/CustomMultiInput";
import { Button } from "@material-ui/core";
import { Translator } from "../../utils/Translator";
export function ClientForm({ personID }) {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phones, setPhones] = useState("");
  const [photo, setPhoto] = useState(null);
  return (
    <>
      <AjaxForm
        path={`/api/clients/${personID || ""}`}
        autoload={personID}
        method={!personID ? "post" : "put"}
        willSubmit={inputs => {
          inputs.photo = photo;
          inputs.phones = phones;
          return inputs;
        }}
        submitted={() => {}}
        getter={() => {}}
      >
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <PanelContainer title="Cliente" subtitle="Fill the Form">
              <GridItem xs={12} sm={12} md={12}>
                <CameraView
                  autoStart={personID == null}
                  photo={photo}
                  onPhotoTaken={pic => {
                    setPhoto(pic);
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <SimpleInput
                  type="text"
                  title="Nombre Completo"
                  name="fullname"
                  onBlur={({ target }) => {
                    setName(target.value);
                  }}
                  value={fullName}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <SimpleInput
                  type="mail"
                  title="Correo Electronico"
                  name="email"
                  onBlur={({ target }) => {
                    setEmail(target.value);
                  }}
                  value={email}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomMultiInput
                  key={new Date()}
                  labelText="Phone"
                  id="phone"
                  value={phones}
                  onChange={values => {
                    setPhones(JSON.stringify(values));
                  }}
                  inputProps={{
                    name: "phones",
                    type: "tel"
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
    </>
  );
}
