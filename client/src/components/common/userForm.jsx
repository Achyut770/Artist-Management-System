import React from "react";
import {
  editValidationSchema,
  registerValidationSchema,
} from "../auth/schemas";
import Button from "./Ui/Button";
import InputField from "./Ui/Input";
import useFormHandler from "../../hooks/useFormHandles";
import SelectField from "./Ui/SelectField";
import RadioButtonField from "./Ui/RadioButton";

const GENDERS = [
  { value: "m", label: "Male" },
  { value: "f", label: "Female" },
  { value: "o", label: "Other" },
];

const fields = [
  { id: "first_name", name: "first_name", type: "text", label: "First Name" },
  { id: "last_name", name: "last_name", type: "text", label: "Last Name" },
  { id: "email", name: "email", type: "email", label: "Email" },
  { id: "password", name: "password", type: "password", label: "Password" },
  {
    id: "confirm_password",
    name: "confirm_password",
    type: "password",
    label: "Confirm Password",
  },
  { id: "phone", name: "phone", type: "text", label: "Phone" },
  { id: "dob", name: "dob", type: "date", label: "Date of Birth" },
  { id: "address", name: "address", type: "text", label: "Address" },
];

const roles = [
  { value: "super_admin", label: "Super Admin" },
  { value: "artist_manager", label: "Artist Manager" },
  { value: "artist", label: "Artist" },
];

const UserForm = ({ initialValue, handleSubmit, isEditMode = false }) => {
  const initialValues = initialValue || {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    dob: "",
    gender: "m",
    address: "",
    role: "",
  };

  const formik = useFormHandler({
    initialValues,
    validationSchema: isEditMode
      ? editValidationSchema
      : registerValidationSchema,
    handleSubmit,
    isEditMode,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {fields.map(({ id, name, type, label }) => {
        if (isEditMode && (name === "password" || name === "confirm_password"))
          return null;

        return (
          <InputField
            key={id}
            id={id}
            name={name}
            type={type}
            label={label}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors[name]}
            touched={formik.touched[name]}
          />
        );
      })}

      <RadioButtonField
        id="gender"
        name="gender"
        label="Gender"
        options={GENDERS}
        value={formik.values.gender}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.gender}
        touched={formik.touched.gender}
      />

      <SelectField label="Role" name="role" formik={formik} options={roles} />
      <Button
        type="submit"
        className="submit-button"
        isloading={formik.isSubmitting}
      >
        {isEditMode ? "Update" : "Register"}
      </Button>
    </form>
  );
};

export default UserForm;
