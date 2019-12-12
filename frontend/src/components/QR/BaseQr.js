import React, { useState, useEffect } from "react";
import qrcode from "qrcode-generator-es6";
import { optionalFn } from "../../core/helpers";
/**
 *
 * @param {hash}
 */
export function BaseQr({ hash, style = {}, onSRCLoad }) {
  const [src, setSRC] = useState("");
  const qrSetter = data => {
    const qr = new qrcode(0, "L");
    const div = document.createElement("div");
    qr.addData(data);
    qr.make();
    div.insertAdjacentHTML("beforeEnd", qr.createImgTag(10));
    let path = div.querySelector("img").src;
    setSRC(path);
    optionalFn(onSRCLoad)(path);
  };
  useEffect(() => {
    qrSetter(hash);
    // eslint-disable-next-line
  }, [hash]);
  return (
    <img
      key={hash}
      alt={hash}
      src={src}
      className="qr"
      style={{ width: "100%", height: "auto", margin: "auto", ...style }}
    />
  );
}
