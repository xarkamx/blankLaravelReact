import React, { useState } from "react";
import { DashboardRoutes } from "routes/dashboard.jsx";
import { FontIcon } from "../../components/Icons/FontIcon";
import { Helpers } from "../../core/helpers";
import "./scss/search.scss";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { NavLink } from "react-router-dom";
import { FullScreenModal } from "./../../components/CustomModal/FullScreenModal";
import { SimpleInput } from "./../../components/CustomInput/SimpleInput";
import { FaButton } from "./../../components/CustomButtons/FaButton";

export function SearchInput() {
  const [open, toggle] = useState(false);
  const [search, setSearch] = useState("");
  let menu = new DashboardRoutes().get();
  const helpers = new Helpers();

  function Results({ menu, search }) {
    return search
      ? helpers.searchInObject(menu, search).map((item, key) => {
          if (typeof item.path === "undefined") {
            return null;
          }
          item.path = item.path.replace(/:[a-z]+/g, "");
          return (
            <GridItem xs={12} sm={4} key={key}>
              <NavLink to={item.path}>
                <div className="searchMenu">
                  <div className="icon">
                    <FontIcon iconName={`fa-${item.icon}`} />
                  </div>
                  <div className="name" style={{ color: "white" }}>
                    {item.sidebarName}
                  </div>
                </div>
              </NavLink>
            </GridItem>
          );
        })
      : [];
  }
  return (
    <>
      <FaButton
        icon={"search"}
        onClick={() => {
          toggle(true);
        }}
      ></FaButton>
      <FullScreenModal
        open={open}
        onClose={() => {
          toggle(!open);
        }}
      >
        <div className={`searchbox ${search ? "searching" : ""}`}>
          <SimpleInput
            className={`searchInput`}
            title="Buscar..."
            autoFocus
            onChange={({ target }) => {
              setSearch(target.value);
            }}
          />
        </div>
        <GridContainer>
          <Results menu={menu} search={search} />
        </GridContainer>
      </FullScreenModal>
    </>
  );
}
