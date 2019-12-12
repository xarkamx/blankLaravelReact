import React from "react";
import { FaButton } from "../CustomButtons/FaButton";
import { printURL } from "../../utils/Utils";
export function PrintFromURL({ url, title = "imprimir" }) {
  return (
    <>
      <FaButton
        icon="print"
        title={title}
        onClick={() => {
          printURL(url);
        }}
      />
    </>
  );
}
