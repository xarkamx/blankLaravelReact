import React, { useState } from "react";
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
  ...rest
}) {
  const [val, setValue] = useState(value);
  title = new Translator(title).get();
  return (
    <CustomInput
      labelText={title}
      value={val}
      onChange={ev => {
        setValue(upperCase ? ev.target.value.toUpperCase() : ev.target.value);
        optionalFn(onChange)(ev);
      }}
      formControlProps={{
        fullWidth: true
      }}
      inputProps={{
        type,
        className: className,
        onBlur: onBlur,
        name: name,
        ...rest
      }}
    />
  );
}
