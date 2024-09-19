import React from 'react';
import { songValidationSchema } from './schema';
import Button from '../../common/Ui/Button';
import useFormHandler from '../../../hooks/useFormHandles';
import InputField from '../../common/Ui/Input';
const GENRES = ['rnb', 'country', 'classic', 'rock', 'jazz'];

const fields = [
    { id: 'title', name: 'title', type: 'text', label: 'Song Title' },
    { id: 'album_name', name: 'album_name', type: 'text', label: 'Album Name' },
];

const SongForm = ({ initialValue, handleSubmit, isEditMode = false }) => {
    const initialValues = initialValue || {
        title: '',
        genre: GENRES[0],
        album_name: '',
    };

    const formik = useFormHandler({
        initialValues,
        validationSchema: songValidationSchema,
        handleSubmit,
        isEditMode
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
                <label htmlFor="genre">Genre</label>
                <select
                    id="genre"
                    name="genre"
                    value={formik.values.genre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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

            <Button type="submit" className="submit-button" loading={formik.isSubmitting}>
                {isEditMode ? 'Update Song' : 'Add Song'}
            </Button>
        </form>
    );
};

export default SongForm;
