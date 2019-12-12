import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { useState } from "react";
import { optionalFn, validInputDate } from "../../core/helpers";
import { SimpleInput } from "./SimpleInput";
/*eslint eqeqeq:0*/
export function RangeDate({ date1, date2, onChange, ...rest }) {
  const [since, setSince] = useState(date1 || validInputDate(new Date()));
  const [to, setTo] = useState(date2 || validInputDate(new Date()));
  const [error, setError] = useState(null);
  /**
   * Determina los valores del evento onChance.
   */
  const setChangeListener = ({ since, to }) => {
    const d1 = new Date(since).getTime();
    const d2 = new Date(to).getTime();
    if (d2 < d1 || since == "" || to == "") {
      setError("Rango no valido");
      return false;
    }
    const values = { since, to };
    optionalFn(onChange)(values);

    setError(null);
  };
  return (
    <>
      <GridContainer>
        <GridItem xs={12} md={6}>
          <SimpleInput
            title="Desde"
            type="date"
            value={since}
            onBlur={({ target }) => {
              setSince(target.value);
              setChangeListener({ since: target.value, to });
            }}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <SimpleInput
            title="Hasta"
            type="date"
            value={validInputDate(to)}
            onBlur={({ target }) => {
              setTo(target.value);
              setChangeListener({ since, to: target.value });
            }}
          />
        </GridItem>
        <GridItem xs={12}>
          <span style={{ color: "red" }}>{error}</span>
        </GridItem>
      </GridContainer>
    </>
  );
}
