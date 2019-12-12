import React from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.jsx";
import { Translator } from "../../utils/Translator";
import { PanelContainer } from "../Panel/PanelContainer";
/**
 *
 * @param {items,itemsByLine,modifier,titleKey,children} param0
 */
export function CardList({
  items,
  itemsByLine = 1,
  modifier,
  titleKey,
  children
}) {
  const columnSize = Math.floor(12 / itemsByLine);
  let list = [];
  for (let key in items) {
    let value = items[key];
    let title = value[titleKey];
    value = typeof modifier === "function" ? modifier(value, key) : value;
    list.push(
      <GridItem xs={12} md={columnSize} key={key}>
        <PanelContainer title={new Translator(title || key).get()}>
          {value}
        </PanelContainer>
      </GridItem>
    );
  }
  return (
    <GridContainer>
      {list}
      {children}
    </GridContainer>
  );
}
