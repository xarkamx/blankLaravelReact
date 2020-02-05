import React, { useState } from "react";
import "./scss/burguerButton.scss";
import { optionalFn } from "../../core/helpers";
export function BurguerButton(props) {
  const { style = {}, onClick } = props;
  const [status, setStatus] = useState(false);
  const enabler = status ? "active" : "";
  const className = "burguerButton " + enabler;

  return (
    <div
      className={className}
      style={style}
      onClick={() => {
        optionalFn(onClick)(!status);
        setStatus(!status);
      }}
    >
      <div />
      <div />
      <div />
    </div>
  );
}
