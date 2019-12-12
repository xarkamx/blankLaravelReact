import React, { Component } from "react";

import { ListItem, List } from "@material-ui/core";
import { Helpers } from "../../core/helpers";
/* eslint eqeqeq: 0*/
export class AnchorList extends Component {
  renderAnchorList(jsonList, type) {
    if (jsonList == "") {
      return null;
    }
    const helpers = new Helpers();
    let listContent = helpers.isJsonString(jsonList);
    const list = listContent || [jsonList];
    return list.map((item, key) => {
      return (
        <ListItem key={key}>
          <a aria-label={type} href={`${type}:${item}`}>
            {item}
          </a>
        </ListItem>
      );
    });
  }
  render() {
    const { type, items } = this.props;
    return <List dense={true}>{this.renderAnchorList(items, type)}</List>;
  }
}
