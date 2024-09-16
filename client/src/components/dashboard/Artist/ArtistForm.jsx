import React from 'react';
import { useFormik } from 'formik';
import { artistCommonSchema } from './schema';
import Button from '../../common/Button';

const ArtistForm = ({ initialValue, handleSubmit, isEditMode = false }) => {
    const initialValues = initialValue || {
        name: '',
        dob: '',
        gender: 'm',
        address: '',
        first_release_year: '',
        no_of_albums_released: '',
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: artistCommonSchema,
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
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className="error-text">{formik.errors.name}</div>
                ) : null}
            </div>

            <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                    id="dob"
                    name="dob"
                    type="date"
                    {...formik.getFieldProps('dob')}
                />
                {formik.touched.dob && formik.errors.dob ? (
                    <div className="error-text">{formik.errors.dob}</div>
                ) : null}
            </div>

            <div className="form-group">
                <label>Gender</label>
                <div role="group" className='gender-group' aria-labelledby="gender-group">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="m"
                            checked={formik.values.gender === 'm'}
                            onChange={formik.handleChange}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="f"
                            checked={formik.values.gender === 'f'}
                            onChange={formik.handleChange}
                        />
                        Female
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="o"
                            checked={formik.values.gender === 'o'}
                            onChange={formik.handleChange}
                        />
                        Other
                    </label>
                </div>
                {formik.touched.gender && formik.errors.gender ? (
                    <div className="error-text">{formik.errors.gender}</div>
                ) : null}
            </div>

            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    name="address"
                    type="text"
                    {...formik.getFieldProps('address')}
                />
                {formik.touched.address && formik.errors.address ? (
                    <div className="error-text">{formik.errors.address}</div>
                ) : null}
            </div>

            <div className="form-group">
                <label htmlFor="first_release_year">First Release Year</label>
                <input
                    id="first_release_year"
                    name="first_release_year"
                    type="number"
                    {...formik.getFieldProps('first_release_year')}
                />
                {formik.touched.first_release_year && formik.errors.first_release_year ? (
                    <div className="error-text">{formik.errors.first_release_year}</div>
                ) : null}
            </div>

            <div className="form-group">
                <label htmlFor="no_of_albums_released">Number of Albums Released</label>
                <input
                    id="no_of_albums_released"
                    name="no_of_albums_released"
                    type="number"
                    {...formik.getFieldProps('no_of_albums_released')}
                />
                {formik.touched.no_of_albums_released && formik.errors.no_of_albums_released ? (
                    <div className="error-text">{formik.errors.no_of_albums_released}</div>
                ) : null}
            </div>

            <Button type="submit" className="submit-button" loading={formik.isSubmitting}>
                {isEditMode ? 'Update' : 'Register'}
            </Button>
        </form>
    );
};

export default ArtistForm;
