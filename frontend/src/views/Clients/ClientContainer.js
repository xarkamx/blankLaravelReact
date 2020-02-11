import React, { useState, useEffect } from "react";
import { AsyncDataTable } from "./../../components/Table/AsycnDataTable";
import { Image } from "./../../components/Images/Image";
import { AnchorList } from "./../../components/Anchors/AnchorList";
import { FaButton } from "../../components/CustomButtons/FaButton";
import {
  primaryColor,
  secondaryColor,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx";
import { ClientForm } from "./ClientsForm";
import { CustomModal } from "./../../components/CustomModal/CustomModal";
import QR from "./../../components/QR/Qr";
import { AuthFetch } from "./../../utils/AuthFetch";
export function ClientContainer() {
  const [id, setID] = useState(null);
  const [open, toggleModal] = useState(0);
  const [key, setKey] = useState(0);
  return (
    <AsyncDataTable
      key={key}
      path="api/clients/paginated"
      title="Lista de clientes"
      subtitle="Lista para crear,editar y eliminar clientes"
      titles={{
        photo: "Foto",
        fullname: "Nombre Completo",
        email: "Correo",
        phones: "Teléfonos",
        actions: "Acciones"
      }}
      inModal={
        <ClientForm
          personID={id}
          onSave={() => {
            toggleModal(false);
            setID(null);
          }}
        />
      }
      modalOpen={open}
      onClose={() => {
        toggleModal(false);
        setID(null);
      }}
      formatContent={item => {
        console.log(item.photo);
        return [
          <Image
            src={item.photo}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "100%",
              boxShadow: "1px 1px 3px #007777"
            }}
          />,
          item.fullname,
          item.email,
          <AnchorList
            key={`phones-${item.phones}`}
            type="tel"
            items={item.phones}
          />,
          <>
            <FaButton
              icon="edit"
              style={{ color: primaryColor, fontSize: "12px" }}
              onClick={() => {
                setID(item.id);
                toggleModal(true);
              }}
            />
            <ClientQR id={item.id} />
            <FaButton
              icon="trash"
              style={{ color: dangerColor, fontSize: "12px" }}
              onClick={() => {
                const fetch = new AuthFetch(`api/clients/${item.id}`);
                fetch.delete().then(() => {});
                setKey(item.id);
              }}
            />
          </>
        ];
      }}
    />
  );
}
export function ClientQR({ id }) {
  const [hash, setHash] = useState("{h:''}");
  const [open, toggle] = useState(0);

  const fetch = new AuthFetch(`api/clients/${id}`);
  const loadClient = async () => {
    const data = (await fetch.get()).data;
    setHash(`{h:"${data.hash}"}`);
  };

  return (
    <>
      <FaButton
        icon="qrcode"
        style={{ color: secondaryColor, fontSize: "12px" }}
        onClick={() => {
          loadClient().then(() => {
            toggle(1);
          });
        }}
      />
      <CustomModal
        open={open}
        onClose={() => {
          toggle(0);
        }}
      >
        <QR
          data={hash}
          onReload={() => {
            fetch.put({ hash: true }).then(({ data }) => {
              setHash(`{h:"${data.hash}"}`);
            });
          }}
        />
      </CustomModal>
    </>
  );
}
