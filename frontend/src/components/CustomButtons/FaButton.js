import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { FontIcon } from "../Icons/FontIcon";

export function FaButton({
  children,
  icon,
  onClick,
  size,
  background,
  style,
  ...rest
}) {
  return (
    <IconButton
      {...rest}
      aria-label={icon}
      size="small"
      onClick={onClick}
      style={{ background: background }}
    >
      <FontIcon iconName={`fa-${icon}`} style={{ fontSize: size, ...style }}>
        <span>{children}</span>
      </FontIcon>
    </IconButton>
  );
}
