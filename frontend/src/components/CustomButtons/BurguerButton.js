import React, { useState } from "react";
import "./scss/burguerButton.scss";
import { optionalFn } from "../../core/helpers";
import { shadowColor } from "../../assets/jss/material-dashboard-react";
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
      <div style={{ background: shadowColor }} />
      <div style={{ background: shadowColor }} />
      <div style={{ background: shadowColor }} />
    </div>
  );
}
