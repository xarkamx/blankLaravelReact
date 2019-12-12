import React from "react";
import { Translator } from "../../utils/Translator";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import "./panel.scss";
import { WallSize } from "../FilterWall/SizeWall";
import { FaButton } from "../CustomButtons/FaButton";
import { ConditionalWall } from "../FilterWall/ConditionalWall";

export class PanelContainer extends React.Component {
  render() {
    const { title, subtitle, footer, onAdd, icon } = this.props;
    return (
      <Card>
        <WallSize minSize={600}>
          <CardHeader color="primary">
            <ConditionalWall conditional={onAdd}>
              <div style={{ float: "right" }}>
                <FaButton
                  icon={icon || "plus"}
                  style={{ color: "white" }}
                  onClick={onAdd}
                  size="2rem"
                  aria-label="Añadir"
                />
              </div>
            </ConditionalWall>

            <h4
              className={"cardTitleWhite"}
              style={{ textTransform: "capitalize" }}
            >
              {new Translator(title).get()}
            </h4>

            <p className={"cardCategoryWhite"}>
              {new Translator(subtitle).get()}
            </p>
          </CardHeader>
        </WallSize>
        <WallSize maxSize={600}>
          <h5 style={{ textAlign: "center", fontWeight: "bolder" }}>
            {new Translator(title).get()}
            <ConditionalWall conditional={onAdd}>
              <FaButton icon="plus" onClick={onAdd} size="1rem" />
            </ConditionalWall>
          </h5>
        </WallSize>
        <CardBody className={"cardBody"}>
          <GridContainer justify="center" alignContent="center">
            {this.props.children}
          </GridContainer>
        </CardBody>
        <CardFooter>{footer}</CardFooter>
      </Card>
    );
  }
}
