import React from "react";
import "./styles/inputField.css";

const SelectField = ({ label, name, formik, options }) => {
  if (!options) return;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} {...formik.getFieldProps(name)}>
        <option value="" disabled>
          Select {label}
        </option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {formik.touched[name] && formik.errors[name] && (
        <div className="error-text">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default SelectField;
