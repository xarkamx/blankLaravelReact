import React, { useState } from "react";
import { FullScreenModal } from "../../components/CustomModal/FullScreenModal";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer";
import { SimpleInput } from "./../../components/CustomInput/SimpleInput";
import { Button } from "@material-ui/core";
import { optionalFn } from "../../core/helpers";
import { Time } from "../../core/Calcs";
export function Sandbox() {
  return (
    <div style={{ background: "black", height: "100vh" }}>
      <FullScreenModal
        style={{
          background: "rgba(255,255,255,0.99)",
          fontFamily: "Sulphur Point"
        }}
      >
        <ChoicePanel
          title="¿Que Prefieres?"
          text={<h3>Hablar con un asesor o cotizar en linea</h3>}
          options={[
            {
              title: "Asesor",
              content: (
                <>
                  <h3>¿En que momento podemos contactarte?</h3>
                  <TimeFrame timeFormat="12" />
                </>
              )
            },
            { title: "En linea", content: "hola2" }
          ]}
        />
      </FullScreenModal>
    </div>
  );
}
export function ContactForm({ onSubmit }) {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  return (
    <>
      <center>
        <h1 style={{ fontFamily: "Sulphur Point" }}>¡¡Hola!!</h1>
        <p>Hey, parece que quieres cotizar un nuevo Proyecto</p>
        <p>Antes de empezar, hablanos un poco sobre ti.</p>
      </center>
      <GridContainer>
        <GridItem xs={12}>
          <SimpleInput
            onChange={({ target }) => {
              setName(target.value);
            }}
            title="¿Cual es tu nombre?"
            pattern="[a-z A-Z]+"
            value={name}
          ></SimpleInput>
        </GridItem>

        <GridItem xs={12}>
          <SimpleInput
            onChange={({ target }) => {
              setMail(target.value);
            }}
            title="¿Cual es tu correo?"
            value={mail}
            type="email"
          ></SimpleInput>
        </GridItem>

        <GridItem xs={12}>
          <SimpleInput
            onChange={({ target }) => {
              setTel(target.value);
            }}
            title="¿Cual es tu numero de teléfono?"
            type="tel"
            value={tel}
          ></SimpleInput>
        </GridItem>

        <GridItem xs={12}>
          <Button
            fullWidth
            onClick={() => {
              optionalFn(onSubmit)({ tel, name, mail });
            }}
          >
            Continuar
          </Button>
        </GridItem>
      </GridContainer>
    </>
  );
}
/**
 *
 * @param {string,string,{string,obj}} param0
 */
export function ChoicePanel({ title, text, options }) {
  const [choice, setChoice] = useState(null);
  if (choice !== null) {
    return choice;
  }
  return (
    <>
      <h1>{title}</h1>
      <p>{text}</p>
      {options.map(option => {
        return (
          <Button
            onClick={() => {
              setChoice(option.content);
            }}
          >
            {option.title}
          </Button>
        );
      })}
    </>
  );
}
export function TimeFrame({ onSet, timeFormat, onContinue, ...rest }) {
  const style = { fontSize: "3rem" };
  const [since, setSince] = useState("12:00");
  const [until, setUntil] = useState("12:30");
  const minSeparation = (time1, time2, separation, callback = null) => {
    time1 = new Time(time1);
    time2 = new Time(time2);
    const diff = time2.get().minutes - time1.get().minutes;
    console.log([time2.get().minutes, time1.get().minutes, diff]);
    if (diff < separation) {
      optionalFn(callback)(diff, time1, time2);
    }
  };
  return (
    <div>
      <GridContainer>
        <GridItem xs={6}>
          <SimpleInput
            title="Desde"
            type="time"
            style={style}
            value={since}
            onChange={({ target }) => {
              const value = target.value;
              setSince(value);
              minSeparation(value, until, 30, (diff, time1) => {
                let time = time1.addTime(30, "minutes").toString();
                setUntil(time.substring(0, 5));
              });
            }}
          />
        </GridItem>
        <GridItem xs={6}>
          <SimpleInput
            title="Hasta"
            type="time"
            style={style}
            onChange={({ target }) => {
              const value = target.value;
              setUntil(value);
              minSeparation(since, value, 30, (diff, time1, time2) => {
                let time = time2.addTime(-30, "minutes").toString();
                console.log(time.toString());
                setSince(time.substring(0, 5));
              });
            }}
            value={until}
          />
        </GridItem>
        <GridItem xs={12}>
          <Button
            fullWidth
            onClick={() => {
              optionalFn(onContinue)({ since, until });
            }}
          >
            Continuar
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
