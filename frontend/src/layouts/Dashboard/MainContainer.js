import React, { useState } from "react";
import { MainMenu } from "../../components/Sidebar/MainMenu";
import { BurguerButton } from "../../components/CustomButtons/BurguerButton";
export function MainContainer({ routes, children }) {
  const [placement, setPlacement] = useState("");
  const frontClass = `frontContainer ${placement}`;
  return (
    <>
      <div className="backContainer">
        <MainMenu routes={routes} />
      </div>
      {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
      <div className={frontClass}>
        <header>
          <BurguerButton
            onClick={() => {
              setPlacement(placement == "" ? "left" : "");
            }}
          />
        </header>
        {children}
      </div>
    </>
  );
}
