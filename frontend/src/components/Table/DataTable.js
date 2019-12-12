import React, { Component } from "react";
import "./DataTable.scss";
import { CustomModal } from "../CustomModal/CustomModal";
import { PanelContainer } from "../Panel/PanelContainer";
import { FontIcon } from "../Icons/FontIcon";
import { ActionInput } from "../CustomInput/ActionInput";
import GridItem from "components/Grid/GridItem.jsx";
import { CustomTable } from "./CustomTable";

/* eslint eqeqeq: 0*/

/**
 * @description Genera una tabla ordenable y buscable con la informacion *
 * proporcionada.
 * @prop content
 * @prop title
 * @prop modalOpen
 * @prop className,
 * @prop titles,
 * @prop inModal
 * @prop title
 * @prop subtitle
 * @prop onClose
 */
export class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.content,
      open: props.modalOpen || false
    };
    this.contentSize = 0;
  }
  componentWillReceiveProps(nextProps) {
    const content = {};
    if (nextProps.content !== this.state.data) {
      content.data = nextProps.content;
    }
    if (nextProps.modalOpen !== this.state.open) {
      content.open = nextProps.modalOpen;
    }
    this.setState(content);
  }
  toggleModal(open) {
    this.setState({ open });
  }
  /**
   *
   * @param {*} data
   * @param {*} per
   * @param {*} page
   */

  render() {
    const {
      className,
      titles,
      inModal,
      title,
      subtitle,
      onClose,
      hideButton,
      ...rest
    } = this.props;
    const { data, open, search } = this.state;
    return (
      <main className={className}>
        <PanelContainer
          title={title}
          subtitle={subtitle}
          onAdd={
            hideButton
              ? false
              : () => {
                  this.setState({ open: true });
                }
          }
        >
          <GridItem xs={12}>
            <ActionInput
              title="Buscar"
              value=""
              icon={<FontIcon iconName="fa-search" />}
              onClick={value => {
                this.setState({ page: 0, search: value });
                return "";
              }}
            />
          </GridItem>
          {this.props.prev}
          <CustomTable search={search} titles={titles} data={data} {...rest} />
          <CustomModal onClose={onClose} open={open || false}>
            {inModal}
          </CustomModal>
          {this.props.children}
        </PanelContainer>
      </main>
    );
  }
}
