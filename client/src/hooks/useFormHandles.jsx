import { useFormik } from "formik";

const useFormHandler = ({
  initialValues,
  validationSchema,
  handleSubmit,
  isEditMode,
}) => {
  const formik = useFormik({
    initialValues,
    enableReinitialize: isEditMode,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await handleSubmit(values);
        if (!isEditMode) {
          formik.resetForm();
        }
      } catch (error) {
        console.error("Submission error:", error);
      }
    },
  });

  return formik;
};

export default useFormHandler;
