import React, { useState } from "react";
import { ActionInput } from "./ActionInput";
import { FontIcon } from "../Icons/FontIcon";
import { Helpers } from "../../core/helpers";
/* eslint eqeqeq: 0*/
export function MaterialSelector({ children, ...rest }) {
  const [dir, setDir] = useState(false);
  const [search, setSearch] = useState("");
  const helpers = new Helpers();
  let options = formatChildrenToOptions(children);
  let filtered = helpers.searchInObject(options, search);
  if (filtered.length <= 0) {
    filtered = helpers.searchInObject(options, search.replace(/ /g, "|"));
  }
  options = filtered.length <= 0 ? options : filtered;
  return (
    <div>
      <ActionInput
        onChange={ev => {
          setSearch(ev.target.value);
        }}
        {...rest}
        icon={<FontIcon iconName={`fa-caret-${dir ? "up" : "down"}`} />}
        onClick={() => {
          setDir(!dir);
        }}
      />
      {options.map(item => {
        return (
          <li
            onClick={() => {
              console.log(item);
            }}
          >
            {item.label}
          </li>
        );
      })}
    </div>
  );
}
function formatChildrenToOptions(children) {
  let options = [];
  children = children || [];
  children = _formatChildren(children);
  children.map((map, key) => {
    let item = map.props;
    if (item == undefined) {
      return false;
    }
    options.push({ value: item.value, label: item.children });
    return options;
  });
  return options;
}
function _formatChildren(children) {
  let formatedChildren = [];
  if (!Array.isArray(children)) {
    children = [children];
  }
  for (let item of children) {
    if (Array.isArray(item)) {
      formatedChildren = [...formatedChildren, ...item];
    } else {
      formatedChildren.push(item);
    }
  }
  return formatedChildren;
}
