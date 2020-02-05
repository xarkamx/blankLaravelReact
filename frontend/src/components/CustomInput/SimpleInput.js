import React, { useState, useEffect } from "react";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import "./scss/groupInput.scss";
import { Translator } from "../../utils/Translator";
import { optionalFn } from "../../core/helpers";

/* eslint eqeqeq: 0*/

export function SimpleInput({
  title,
  value,
  onChange,
  type,
  className,
  onBlur,
  name,
  upperCase,
  errorMessage,
  ...rest
}) {
  const [val, setValue] = useState(value);
  const [error, setError] = useState(0);
  title = new Translator(title).get();
  useEffect(() => {
    setValue(value);
  }, [value]);
  return (
    <>
      <CustomInput
        labelText={title}
        value={val}
        onChange={ev => {
          let value = optionalFn(onChange)(ev) || ev.target.value;
          //setValue(upperCase ? value.toUpperCase() : value);
        }}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          type,
          className: className,
          onBlur: ev => {
            if (ev.target.checkValidity()) {
              setError(0);

              let value = optionalFn(onBlur)(ev) || ev.target.value;
              //setValue(upperCase ? value.toUpperCase() : value);
              return true;
            }
            setError(1);
          },
          name: name,
          ...rest
        }}
      />
      {error ? (
        <div className="error">
          {errorMessage || "Parece que hay un error aqui."}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
