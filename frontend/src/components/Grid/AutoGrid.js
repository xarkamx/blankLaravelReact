import React from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.jsx";
/* eslint eqeqeq:0 */
export function AutoGrid({ children, arrangement = 3 }) {
  const format = (items, arrangement) => {
    if (Array.isArray(items)) {
      return setColumns(items, arrangement);
    }
    return <GridItem xs={12}>{items}</GridItem>;
  };
  const setColumns = (items, arrangement) => {
    const last = items.length;
    const columnSize = Math.ceil(12 / arrangement);
    const excedent = last % arrangement;
    const lastSize = Math.ceil(12 / excedent);

    return items.map((item, key) => {
      return (
        <GridItem
          alignItems={"center"}
          xs={12}
          md={key == last - excedent ? lastSize : columnSize}
          key={key}
        >
          {item}
        </GridItem>
      );
    });
  };
  return (
    <GridContainer alignItems={"center"}>
      {format(children, arrangement)}
    </GridContainer>
  );
}
