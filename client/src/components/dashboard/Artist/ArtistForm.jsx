import React from "react";
import { apiPath } from "../../../api/api";
import useFetch from "../../../hooks/useFetch";
import useFormHandler from "../../../hooks/useFormHandles";
import Button from "../../common/Ui/Button";
import InputField from "../../common/Ui/Input";
import { artistSchema } from "./schema";
import SelectField from "../../common/Ui/SelectField";
import RadioButtonField from "../../common/Ui/RadioButton";
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

  const users = data ? data.user : [];

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
  const selectArtistList = initialValue
    ? [
        {
          value: initialValue.user_id,
          label: initialValue.user_full_name,
        },
        ...users,
      ]
    : [...users];

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

      <RadioButtonField
        id="gender"
        name="gender"
        label="Gender"
        options={genderOptions}
        value={formik.values.gender}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.gender}
        touched={formik.touched.gender}
      />

      <SelectField
        label="User"
        name="user_id"
        formik={formik}
        options={selectArtistList}
      />

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
