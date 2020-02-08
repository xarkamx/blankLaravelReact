import React, { useState } from "react";
import { SketchPicker } from "react-color";
import colors from "../../assets/store/colors.json";
import { AutoGrid } from "../../components/Grid/AutoGrid.js";
import { optionalFn } from "../../core/helpers.js";

export function ColorManager({}) {
  let pickers = [];
  for (let item in colors) {
    pickers.push(<ColorPicker title={item} color={colors[item]} />);
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
              color: colorSelection.hex,
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
