import React from "react";

const RadioButtonField = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => (
  <div className="form-group">
    <label>{label}</label>
    <div role="group" className="radio-group" aria-labelledby="radio-group">
      {options.map((option) => (
        <label key={option.value}>
          <input
            id={`${id}-${option.value}`}
            name={name}
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            onBlur={onBlur}
          />
          {option.label}
        </label>
      ))}
    </div>
    {touched && error && <div className="error-text">{error}</div>}
  </div>
);

export default RadioButtonField;
