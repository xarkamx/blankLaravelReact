import React from "react";
import { AutoList } from "./AutoList";
import Card from "components/Card/Card.jsx";
import "./scss/list.scss";
export function VerticalTable(props) {
  const { titles, data } = props;
  const group = data.map((row, index) => {
    let item = {};
    for (let key in titles) {
      let title = titles[key];
      item[title] = row[key];
    }
    return (
      <Card className="verticalTable" key={"vertical" + index}>
        <AutoList list={item} />
      </Card>
    );
  });

  return group;
}
