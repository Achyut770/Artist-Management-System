import * as Yup from 'yup';

export const songValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    genre: Yup.string().required('Genre is required'),
    album_name: Yup.string()
        .required('Album Name  is required'),
});
