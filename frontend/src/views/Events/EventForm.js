import React, { useState } from "react";
import { AjaxForm } from "../../components/Containers/AjaxForm";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { PanelContainer } from "../../components/Panel/PanelContainer";
import { SimpleInput } from "../../components/CustomInput/SimpleInput";
import Button from "@material-ui/core/Button";
import { Translator } from "../../utils/Translator";
import { validInputDate, optionalFn } from "../../core/helpers";
import { Time } from "../../core/Calcs";

export function EventForm({ id, onSave }) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(validInputDate());
  const [endDate, setEndDate] = useState(validInputDate());
  const [schedule, setSchedule] = useState(
    JSON.stringify({ since: "10:00", until: "11:00" })
  );

  return (
    <AjaxForm
      key={id}
      path={`/api/events/${id || ""}`}
      autoload={id != null}
      method={!id ? "post" : "put"}
      willSubmit={inputs => {
        inputs.schedule = schedule;
        return inputs;
      }}
      submitted={inputs => {
        optionalFn(onSave)(inputs);
      }}
      getter={inputs => {
        inputs = inputs.data;
        setName(inputs.name);
        setStartDate(inputs.startDate);
        setEndDate(inputs.endDate);
        console.log(inputs.schedule);
        setSchedule(inputs.schedule);
      }}
    >
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <PanelContainer title="Eventos" subtitle="Fill the Form">
            <GridItem xs={12} sm={12} md={12}>
              <SimpleInput
                type="text"
                title="Nombre del evento"
                name="name"
                onBlur={({ target }) => {
                  setName(target.value);
                }}
                value={name}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <SimpleInput
                type="date"
                title="Arranque"
                name="startDate"
                onBlur={({ target }) => {
                  setStartDate(target.value);
                }}
                value={startDate}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
              <SimpleInput
                type="date"
                title="Termino"
                name="endDate"
                onBlur={({ target }) => {
                  setEndDate(target.value);
                }}
                value={endDate}
              />
            </GridItem>
            <Schedule
              value={schedule}
              onChange={(since, until) => {
                setSchedule(JSON.stringify({ since, until }));
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={"submit"}
            >
              {new Translator("Save").get()}
            </Button>
          </PanelContainer>
        </GridItem>
      </GridContainer>
    </AjaxForm>
  );
}
export function Schedule({ value, onChange }) {
  value = JSON.parse(value);
  const [since, setSince] = useState(value.since);
  const [until, setUntil] = useState(value.until);
  const setSchedule = (since, until) => {
    const sinceTime = new Time(since);
    const untilTime = new Time(until);
    setSince(since);
    if (sinceTime < untilTime) {
      setUntil(until);
    } else {
      setUntil(since);
    }
    optionalFn(onChange)(since, until);
  };
  return (
    <>
      <GridItem xs={6} sm={6} md={6}>
        <SimpleInput
          type="time"
          title="Horario - Desde"
          name="schedule"
          onBlur={({ target }) => {
            setSchedule(target.value, until);
          }}
          value={since}
        />
      </GridItem>
      <GridItem xs={6} sm={6} md={6}>
        <SimpleInput
          type="time"
          title="Horario - Hasta"
          name="schedule"
          onBlur={({ target }) => {
            setSchedule(since, target.value);
          }}
          value={until}
        />
      </GridItem>
    </>
  );
}
