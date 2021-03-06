import React from "react";
import { optionalFn } from "../../core/helpers";
import { PanelContainer } from "../Panel/PanelContainer";
import GridItem from "components/Grid/GridItem.jsx";
import { CustomModal } from "./CustomModal";
import { FaButton } from "../CustomButtons/FaButton";
export function ConditionalModal({ onSubmit, children, open, title, ...rest }) {
  return (
    <>
      <CustomModal
        {...rest}
        open={open}
        onClose={() => {
          optionalFn(onSubmit)(false);
        }}
      >
        <PanelContainer title={title} subtitle=" ">
          <GridItem xs={12} style={{ textAlign: "center" }}>
            {children}
          </GridItem>
          <GridItem xs={6} style={{ textAlign: "center" }}>
            <FaButton
              style={{ color: "green", margin: "0 auto" }}
              icon="check-circle"
              title="aceptar"
              onClick={() => {
                optionalFn(onSubmit)(true);
              }}
            />
          </GridItem>

          <GridItem xs={6} style={{ textAlign: "center" }}>
            <FaButton
              style={{ color: "red" }}
              icon="times"
              title="Cancelar"
              onClick={() => {
                optionalFn(onSubmit)(false);
              }}
            />
          </GridItem>
        </PanelContainer>
      </CustomModal>
    </>
  );
}
