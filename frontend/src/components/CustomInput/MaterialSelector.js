import React, { useState, useRef } from "react";
import { ActionInput } from "./ActionInput";
import { FontIcon } from "../Icons/FontIcon";
import { Helpers, optionalFn } from "../../core/helpers";
import { ConditionalWall } from "../FilterWall/ConditionalWall";
import "./scss/materialSelector.scss";
/* eslint eqeqeq: 0*/
export function MaterialSelector({
  children,
  value = "",
  values,
  onChange,
  ...rest
}) {
  const [search, setSearch] = useState("");
  const [currentIndex, setIndex] = useState(0);
  const [enable, toggleSelector] = useState(false);
  const opRef = useRef([]);
  const helpers = new Helpers();
  let options = values || formatChildrenToOptions(children);
  let filtered = helpers.searchInObject(options, search);
  if (filtered.length <= 0) {
    filtered = helpers.searchInObject(options, search.replace(/ /g, "|"));
  }
  options = filtered.length <= 0 ? options : filtered;
  const handleChange = ev => {
    optionalFn(onChange)(ev);
    if (ev) {
      setSearch(ev.label);
    }
  };
  return (
    <div
      className={"materialSelector"}
      onKeyUp={ev => {
        let index = currentIndex;
        let count = opRef.current.length;
        switch (ev.keyCode) {
          case 40:
            index++;
            break;
          case 38:
            index--;
            break;
          case 13:
          case 27:
          case 9:
            toggleSelector(false);
            return false;
          default:
            return false;
        }
        if (index >= count) {
          index = 0;
        }
        if (index < 0) {
          index = count - 1;
        }
        let current = opRef.current[index];
        window.scrollTo(0, current);
        setIndex(index);
        handleChange(options[index]);
      }}
    >
      <ActionInput
        onFocus={() => {
          toggleSelector(true);
        }}
        value={search}
        onChange={ev => {
          setSearch(ev.target.value);
          toggleSelector(true);
        }}
        {...rest}
        icon={<FontIcon iconName={`fa-caret-${enable ? "up" : "down"}`} />}
        onClick={() => {
          toggleSelector(enable == false);
        }}
      />
      <ConditionalWall conditional={enable}>
        <ul>
          {options.map((item, key) => {
            return (
              <li
                style={{
                  background:
                    currentIndex == key ? "rgba(200,200,200,0.3)" : "none"
                }}
                key={"item-" + key}
                ref={ref => {
                  opRef.current[key] = ref;
                }}
                onClick={() => {
                  handleChange(item);
                  setIndex(key);
                  toggleSelector(false);
                }}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      </ConditionalWall>
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
