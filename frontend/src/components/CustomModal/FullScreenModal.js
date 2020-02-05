import React from "react";
import "./modal.scss";
export function FullScreenModal({ children, open, onClose, ...rest }) {
  return (
    <div className="fullscreenModal" {...rest}>
      {children}
    </div>
  );
}
