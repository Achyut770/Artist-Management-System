// src/components/ArtistForm.js
import React from 'react';
import { artistCommonSchema } from './schema';
import Button from '../../common/Ui/Button';
import useFormHandler from '../../../hooks/useFormHandles';
import InputField from '../../common/Ui/Input';
const fields = [
    { id: 'name', name: 'name', type: 'text', label: 'Name' },
    { id: 'dob', name: 'dob', type: 'date', label: 'Date of Birth' },
    { id: 'address', name: 'address', type: 'text', label: 'Address' },
    { id: 'first_release_year', name: 'first_release_year', type: 'number', label: 'First Release Year' },
    { id: 'no_of_albums_released', name: 'no_of_albums_released', type: 'number', label: 'Number of Albums Released' },
];

const genderOptions = [
    { value: 'm', label: 'Male' },
    { value: 'f', label: 'Female' },
    { value: 'o', label: 'Other' },
];

const ArtistForm = ({ initialValue, handleSubmit, isEditMode = false }) => {
    const initialValues = initialValue || {
        name: '',
        dob: '',
        gender: 'm',
        address: '',
        first_release_year: '',
        no_of_albums_released: '',
    };

    const formik = useFormHandler({
        initialValues,
        validationSchema: artistCommonSchema,
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
                <label>Gender</label>
                <div role="group" className='gender-group' aria-labelledby="gender-group">
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
                {formik.touched.gender && formik.errors.gender ? (
                    <div className="error-text">{formik.errors.gender}</div>
                ) : null}
            </div>

            <Button type="submit" className="submit-button" loading={formik.isSubmitting}>
                {isEditMode ? 'Update' : 'Register'}
            </Button>
        </form>
    );
};

export default ArtistForm;
