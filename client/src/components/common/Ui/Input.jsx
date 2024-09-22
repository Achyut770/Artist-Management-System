import React from "react";

const InputField = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
    {touched && error && (
      <div id="emailHelp" className="error-text">
        {error}
      </div>
    )}
  </div>
);

export default InputField;
