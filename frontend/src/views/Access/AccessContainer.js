import React, { useState } from "react";
import { QrScan } from "./../../components/QR/QrScan";
import { FontIcon } from "./../../components/Icons/FontIcon";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { ActionInput } from "./../../components/CustomInput/ActionInput";
import { AuthFetch } from "./../../utils/AuthFetch";
import { CustomModal } from "./../../components/CustomModal/CustomModal";
import { ClientForm } from "../Clients/ClientsForm";
import { isObjectEmpty, optionalFn } from "./../../core/helpers";
import { ConditionalModal } from "../../components/CustomModal/ConditionalModal";
import { Image } from "../../components/Images/Image";
import Card from "components/Card/Card.jsx";
import { primaryColor } from "assets/jss/material-dashboard-react.jsx";
export function AccessContainer({}) {
  return (
    <>
      <SearchClients />
      <hr />
    </>
  );
}
export function SearchClients({}) {
  const [register, openRegister] = useState(0);
  const [clients, setClients] = useState([]);
  const searchClients = async search => {
    const fetch = new AuthFetch("api/clients");
    fetch.get({ search }).then(items => {
      console.log(items, items.data);
      let data = items.data;
      console.log(data, isObjectEmpty(data));
      if (isObjectEmpty(data)) {
        openRegister(1);
      }
      setClients(data);
    });
  };
  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={3}>
          <QrScan />
        </GridItem>
        <GridItem xs={12} sm={9}>
          <ActionInput
            title="buscar..."
            icon={<FontIcon iconName="fa-search" />}
            onClick={ev => {
              searchClients(ev);
            }}
          />
        </GridItem>
        <GridItem xs={12}>
          <ClientsGrid
            clients={clients}
            onSelection={client => {
              alert(client.fullname);
            }}
          />
        </GridItem>
      </GridContainer>
      <ConditionalRegister
        open={register}
        onSave={() => {
          openRegister(0);
        }}
        onClose={() => {
          openRegister(0);
        }}
      />
    </>
  );
}
function ClientsGrid({ clients = [], onSelection }) {
  return (
    <GridContainer>
      {clients.map((client, key) => (
        <GridItem xs={3}>
          <ClientMiniCard
            photo={client.photo}
            name={client.fullname}
            onClick={() => {
              optionalFn(onSelection)(client);
            }}
          />
        </GridItem>
      ))}
    </GridContainer>
  );
}
function ClientMiniCard({ photo, name, onClick }) {
  const [hover, setHover] = useState(0);
  return (
    <Card
      style={{ background: !hover ? "white" : primaryColor, cursor: "pointer" }}
      onMouseEnter={() => {
        setHover(1);
      }}
      onMouseLeave={() => {
        setHover(0);
      }}
    >
      <GridContainer
        onClick={() => {
          optionalFn(onClick)();
        }}
      >
        <GridItem xs={4}>
          <Image src={photo} style={{ height: "60px" }} />
        </GridItem>
        <GridItem xs={8}>
          <center>
            <strong>{name}</strong>
          </center>
        </GridItem>
      </GridContainer>
    </Card>
  );
}
export function ConditionalRegister({ open, onSave, onClose, ...rest }) {
  const [register, toggleRegister] = useState(0);
  return (
    <>
      <ConditionalModal
        open={open}
        {...rest}
        title=" "
        onSubmit={answer => {
          if (!answer) {
            optionalFn(onClose)();
          } else {
            toggleRegister(1);
          }
        }}
      >
        ¿Deseas registrar a un nuevo cliente?
      </ConditionalModal>
      <CustomModal open={register}>
        <ClientForm
          onSave={inputs => {
            optionalFn(onSave)(inputs);
            toggleRegister(0);
          }}
        />
      </CustomModal>
    </>
  );
}
