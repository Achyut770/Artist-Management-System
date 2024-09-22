import * as Yup from 'yup';

export const artistSchema = Yup.object({
    name: Yup.string().required('This field is required'),
    user_id:Yup.string().required("user_id is required"),
    dob: Yup.date().required('This field is required'),
    gender: Yup.string().oneOf(['m', 'f', 'o'], 'Invalid gender').required('This field is required'),
    address: Yup.string().required('This field is required'),
    first_release_year: Yup.number().integer().min(1900, 'Year must be a valid year').max(new Date().getFullYear(), 'Year cannot be in the future').required('This field is required'),
    no_of_albums_released: Yup.number().integer().min(0, 'Number of albums must be at least 0').required('This field is required'),
});