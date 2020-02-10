import React, { useState } from "react";
import { MainMenu } from "../../components/Sidebar/MainMenu";
import { BurguerButton } from "../../components/CustomButtons/BurguerButton";
import Header from "../../components/Header/Header";
import {
  grayColor,
  shadowColor
} from "../../assets/jss/material-dashboard-react";
/* eslint eqeqeq: 0*/
export function MainContainer({ routes, children, path, ...rest }) {
  const [placement, setPlacement] = useState("");
  const frontClass = `frontContainer ${placement}`;
  const getRouteName = path => {
    const route = routes.filter(item => {
      return item.path == path;
    })[0];
    console.log(route);
    return route ? route.sidebarName : "";
  };
  return (
    <>
      <div className="backContainer">
        <MainMenu routes={routes} />
      </div>
      {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
      <div
        className={frontClass}
        style={{
          boxShadow: `-30px 30px 80px ${shadowColor}, -15px 3px 26px ${grayColor};`
        }}
      >
        <Header
          name={getRouteName(path)}
          leftSide={
            <BurguerButton
              onClick={() => {
                setPlacement(placement == "" ? "left" : "");
              }}
            />
          }
        ></Header>
        {children}
      </div>
    </>
  );
}
