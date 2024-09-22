import React from "react";
import { apiPath } from "../../../api/api";
import useFetch from "../../../hooks/useFetch";
import useFormHandler from "../../../hooks/useFormHandles";
import Button from "../../common/Ui/Button";
import InputField from "../../common/Ui/Input";
import { artistSchema } from "./schema";
const fields = [
  { id: "name", name: "name", type: "text", label: "Name" },
  { id: "dob", name: "dob", type: "date", label: "Date of Birth" },
  { id: "address", name: "address", type: "text", label: "Address" },
  {
    id: "first_release_year",
    name: "first_release_year",
    type: "number",
    label: "First Release Year",
  },
  {
    id: "no_of_albums_released",
    name: "no_of_albums_released",
    type: "number",
    label: "Number of Albums Released",
  },
];

const genderOptions = [
  { value: "m", label: "Male" },
  { value: "f", label: "Female" },
  { value: "o", label: "Other" },
];

const ArtistForm = ({ initialValue, handleSubmit, isEditMode = false }) => {
  const { data, refetchTrigger, error } = useFetch(
    apiPath.userArtistWithOutArtist
  );
  const users = data && data.user;
  console.log("User", users, error);

  const submit = async (values) => {
    try {
      await handleSubmit(values);
      !isEditMode && refetchTrigger();
    } catch (error) {
      throw error;
    }
  };

  const initialValues = initialValue || {
    name: "",
    dob: "",
    gender: "m",
    address: "",
    first_release_year: "",
    no_of_albums_released: "",
    user_id: "",
  };

  const formik = useFormHandler({
    initialValues,
    validationSchema: artistSchema,
    handleSubmit: submit,
    isEditMode,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {fields.map(({ id, name, type, label }) => (
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
      ))}

      <div className="form-group">
        <label>Gender</label>
        <div
          role="group"
          className="gender-group"
          aria-labelledby="gender-group"
        >
          {genderOptions.map(({ value, label }) => (
            <label key={value}>
              <input
                type="radio"
                name="gender"
                value={value}
                checked={formik.values.gender === value}
                onChange={formik.handleChange}
              />
              {label}
            </label>
          ))}
        </div>
        {formik.touched.gender && formik.errors.gender && (
          <div className="error-text">{formik.errors.gender}</div>
        )}
      </div>
      <div className="form-group">
        <label>User</label>
        <select
          name="user_id"
          value={formik.values.user_id}
          onChange={formik.handleChange}
        >
          <option value="">Select a user</option>
          {isEditMode && (
            <option value={initialValues.user_id}>
              {initialValues.user_full_name}
            </option>
          )}
          {users &&
            users.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.full_name}
              </option>
            ))}
        </select>
        {formik.touched.user_id && formik.errors.user_id && (
          <div className="error-text">{formik.errors.user_id}</div>
        )}
      </div>

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

export default ArtistForm;
