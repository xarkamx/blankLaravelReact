import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { AutoGrid } from "../../components/Grid/AutoGrid.js";
import { optionalFn } from "../../core/helpers.js";
import { ColorsUtilities } from "../../utils/ColorsUtilities.js";

export function ColorManager() {
  let colorsUtils = new ColorsUtilities();
  let colors = colorsUtils.getLocalColors();
  let pickers = [];
  for (let item in colors) {
    pickers.push(
      <ColorPicker
        title={item}
        color={colors[item]}
        onChange={ev => {
          colorsUtils.setColors({ colorName: item, hex: ev.hex });
        }}
      />
    );
  }
  return <AutoGrid arrangement={4}>{pickers}</AutoGrid>;
}

export function ColorPicker({ title, color, onChange }) {
  const [colorSelection, setColor] = useState(color);
  return (
    <div
      style={{
        padding: "12px",
        margin: "auto",
        display: "flex",
        alignContent: "center"
      }}
    >
      <div style={{ width: "fit-content", margin: "auto" }}>
        <div>
          <strong
            key={colorSelection}
            style={{
              color: colorSelection.hex || color,
              textTransform: "full-width capitalize",
              padding: "12px"
            }}
          >
            {title}
          </strong>
        </div>
        <SketchPicker
          color={colorSelection}
          onChangeComplete={color => {
            setColor(color);
            optionalFn(onChange)(color);
          }}
        />
      </div>
    </div>
  );
}
