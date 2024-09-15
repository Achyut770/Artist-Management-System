import React from 'react';
import { useFormik } from 'formik';
import Button from './Button';
import { editValidationSchema, registerValidationSchema } from '../auth/schemas';

const UserForm = ({ initialValue, handleSubmit, isEditMode = false }) => {
    const initialValues = initialValue || {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        dob: '',
        gender: 'm',
        address: '',
        role: 'artist',
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: isEditMode ? editValidationSchema : registerValidationSchema,
        onSubmit: async (values) => {
            await handleSubmit(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    {...formik.getFieldProps('first_name')}
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                    <div className="error-text">{formik.errors.first_name}</div>
                ) : null}
            </div>

            <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    {...formik.getFieldProps('last_name')}
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                    <div className="error-text">{formik.errors.last_name}</div>
                ) : null}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error-text">{formik.errors.email}</div>
                ) : null}
            </div>

            {!isEditMode && (
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="error-text">{formik.errors.password}</div>
                    ) : null}
                </div>
            )}

            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    name="phone"
                    type="text"
                    {...formik.getFieldProps('phone')}
                />
                {formik.touched.phone && formik.errors.phone ? (
                    <div className="error-text">{formik.errors.phone}</div>
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
                <label htmlFor="role">Role</label>
                <select id="role" name="role" {...formik.getFieldProps('role')}>
                    <option value="super_admin">Super Admin</option>
                    <option value="artist_manager">Artist Manager</option>
                    <option value="artist">Artist</option>
                </select>
                {formik.touched.role && formik.errors.role ? (
                    <div className="error-text">{formik.errors.role}</div>
                ) : null}
            </div>

            <Button type="submit" className="submit-button" loading={formik.isSubmitting}>
                {isEditMode ? 'Update' : 'Register'}
            </Button>
        </form>
    );
};

export default UserForm;
