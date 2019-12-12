import React, { useState } from "react";
import { FaButton } from "../CustomButtons/FaButton";
import { optionalFn } from "../../core/helpers";
/**
 *
 * @param {value,onChange,title,color} param0
 */
export function FancyCheckBox({
  value,
  onChange,
  title,
  color = "green",
  children
}) {
  const [check, setCheck] = useState(value);
  return (
    <>
      <FaButton
        title={title}
        icon={check ? "check-circle" : "circle"}
        style={{ color: check ? color : "gray" }}
        onClick={() => {
          setCheck(!check);
          optionalFn(onChange)(!check);
        }}
      ></FaButton>
      {children}
    </>
  );
}
