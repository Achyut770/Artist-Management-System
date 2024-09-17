import React from 'react';
import { useFormik } from 'formik';
import { songValidationSchema } from './schema';
import Button from "../../common/Button"

const GENRES = ['rnb', 'country', 'classic', 'rock', 'jazz'];


const SongForm = ({ initialValue, handleSubmit, isEditMode = false }) => {
    const initialValues = initialValue || {
        title: '',
        genre: GENRES[0],
        album_name: "",
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: songValidationSchema,
        onSubmit: async (values) => {
            try {
                await handleSubmit(values);
                !isEditMode && formik.resetForm();
            } catch (error) {
                console.error('Submission error:', error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Song Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    {...formik.getFieldProps('title')}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className="error-text">{formik.errors.title}</div>
                ) : null}
            </div>


            <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <select
                    id="genre"
                    name="genre"
                    {...formik.getFieldProps('genre')}
                >
                    {GENRES.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
                {formik.touched.genre && formik.errors.genre ? (
                    <div className="error-text">{formik.errors.genre}</div>
                ) : null}
            </div>

            <div className="form-group">
                <label htmlFor="album_name">Album Name</label>
                <input
                    id="album_name"
                    name="album_name"
                    type="text"
                    {...formik.getFieldProps('album_name')}
                />
                {formik.touched.album_name && formik.errors.album_name ? (
                    <div className="error-text">{formik.errors.album_name}</div>
                ) : null}
            </div>

            <Button type="submit" className="submit-button" loading={formik.isSubmitting}>
                {isEditMode ? 'Update Song' : 'Add Song'}
            </Button>
        </form>
    );
};

export default SongForm;
