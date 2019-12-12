import React, { Component } from "react";
import GridContainer from "components/Grid/GridContainer";
import { FontIcon } from "../Icons/FontIcon";
import GridItem from "components/Grid/GridItem.jsx";
import "./iconlist.scss";

export class IconList extends Component {
    printList() {}
    render = () => {
        const { children, icon, title } = this.props;
        return (
            <GridContainer className="iconList">
                <GridItem xs={2}>
                    <FontIcon iconName={`fa-${icon}`} />
                </GridItem>
                <GridItem xs={9}>
                    <div>
                        <span
                            style={{
                                fontWeight: "bolder",
                                fontSize: "16px"
                            }}
                        >
                            {title}
                        </span>
                    </div>
                    {children}
                </GridItem>
            </GridContainer>
        );
    };
}
