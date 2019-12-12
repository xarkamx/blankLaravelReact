import React from "react";
import "./scss/badges.scss";
export function DangerBadge({ children }) {
  return <Badge type="danger">{children}</Badge>;
}

export function Badge({ type, children }) {
  return <span className={`badge ${type}`}>{children}</span>;
}
