import React from "react";

export function CustomGrid(props) {
  const { children = [], style } = props;

  const formatChildren = children.map((item, key) => (
    <div style={{ width: "100%", margin: "3px", overflow: "hidden" }} key={key}>
      {item}
    </div>
  ));
  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
        gridColumnGap: "4px",
        ...style
      }}
    >
      {formatChildren}
    </main>
  );
}
