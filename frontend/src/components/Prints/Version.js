import React from "react";
import { currentVersion } from "../../core/helpers";
export function Version() {
  return (
    <>
      <center style={{ textShadow: "1px 1px 1px #eee" }}>
        Versión: {currentVersion()}
      </center>
    </>
  );
}
