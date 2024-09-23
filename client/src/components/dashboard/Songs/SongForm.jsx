import React from "react";
import { songValidationSchema } from "./schema";
import Button from "../../common/Ui/Button";
import useFormHandler from "../../../hooks/useFormHandles";
import InputField from "../../common/Ui/Input";
import SelectField from "../../common/Ui/SelectField";

const GENRES = [
  { label: "R&B", value: "rnb" },
  { label: "Country", value: "country" },
  { label: "Classic", value: "classic" },
  { label: "Rock", value: "rock" },
  { label: "Jazz", value: "jazz" },
];

const fields = [
  { id: "title", name: "title", type: "text", label: "Song Title" },
  { id: "album_name", name: "album_name", type: "text", label: "Album Name" },
];

const SongForm = ({ initialValue, handleSubmit, isEditMode = false }) => {
  const initialValues = initialValue || {
    title: "",
    genre: "",
    album_name: "",
  };

  const formik = useFormHandler({
    initialValues,
    validationSchema: songValidationSchema,
    handleSubmit,
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

      <SelectField
        label="Genre"
        name="genre"
        formik={formik}
        options={GENRES}
      />

      <Button
        type="submit"
        className="submit-button"
        isloading={formik.isSubmitting}
      >
        {isEditMode ? "Update Song" : "Add Song"}
      </Button>
    </form>
  );
};

export default SongForm;
