import React from "react";
/**
 * @description carga tag si la condicion se cumple.
 * @param {conditional,children} param0
 */
export function ConditionalWall({ conditional, or, children }) {
  if (!conditional) {
    return or || null;
  }
  return <React.Fragment>{children}</React.Fragment>;
}
