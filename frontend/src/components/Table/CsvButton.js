import React from "react";
import { FaButton } from "../CustomButtons/FaButton";
import { arrayToCsv } from "../../utils/Utils";
export function CsvButton({ content, titles, fileName }) {
  return (
    <>
      <FaButton
        icon="file-excel"
        title="Descargar CSV"
        onClick={() => {
          arrayToCsv(content, titles, fileName);
        }}
      />
    </>
  );
}
