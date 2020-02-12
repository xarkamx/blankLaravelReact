import React, { useState, useEffect } from "react";
import { AsyncDataTable } from "./../../components/Table/AsycnDataTable";
import { FaButton } from "../../components/CustomButtons/FaButton";
import {
  primaryColor,
  secondaryColor,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx";
import { CustomModal } from "./../../components/CustomModal/CustomModal";
import QR from "./../../components/QR/Qr";
import { AuthFetch } from "./../../utils/AuthFetch";
import { EventForm } from "./EventForm";
export function EventContainer() {
  const [id, setID] = useState(null);
  const [open, toggleModal] = useState(0);
  const [key, setKey] = useState(0);
  return (
    <AsyncDataTable
      key={key}
      path="api/events/paginated"
      title="Lista de eventos"
      subtitle="Lista para crear,editar y eliminar eventos"
      titles={{
        id: "id",
        name: "Nombre del evento",
        startDate: "Fecha de arranque",
        endDate: "Fecha de cierre",
        schedule: "Horarios"
      }}
      inModal={
        <EventForm
          id={id}
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
        const schedule = JSON.parse(item.schedule);
        return [
          item.id,
          item.name,
          item.startDate,
          item.endDate,
          <>{`${schedule.since} - ${schedule.until}`}</>,
          <>
            <FaButton
              icon="edit"
              style={{ color: primaryColor, fontSize: "12px" }}
              onClick={() => {
                setID(item.id);
                toggleModal(true);
              }}
            />
            <FaButton
              icon="trash"
              style={{ color: dangerColor, fontSize: "12px" }}
              onClick={() => {
                const fetch = new AuthFetch(`api/events/${item.id}`);
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
