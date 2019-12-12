import React, { useRef } from "react";
import { BaseQr } from "./BaseQr";
import { DOM } from "../../core/dom";
/**
 *
 * @param {hash,name,date,details} param0
 */
export function QrTicket({ hash, name, date, details, onPrint }) {
  const domTicket = useRef(null);
  const effect = () => {
    new DOM();
    const qr = domTicket.current;
    setTimeout(() => {
      qr.print(onPrint);
    }, 500);
  };
  return (
    <div className="ticket" ref={domTicket}>
      <BaseQr
        hash={hash}
        onSRCLoad={() => {
          effect();
        }}
      />
      <center>
        <p style={{ fontSize: "10px" }}>
          Nombre:
          {name}
        </p>
        <p style={{ fontSize: "10px" }}>
          Fecha:
          {date}
        </p>
        <strong style={{ fontSize: "10px" }}>{details}</strong>
      </center>
    </div>
  );
}
