import * as Yup from 'yup';

const passwordSchema = Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*()_+{}\[\]:;"\'<>,.?~`|-]/, 'Password must contain at least one special character')
    .required('This field is required');

const baseSchema = {
    first_name: Yup.string().required('This field is required'),
    last_name: Yup.string().required('This field is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('This field is required'),
    phone: Yup.string().required('This field is required'),
    dob: Yup.date().required('This field is required'),
    gender: Yup.string().oneOf(['m', 'f', 'o'], 'Invalid gender').required('This field is required'),
    address: Yup.string().required('This field is required'),
    role: Yup.string().oneOf(['super_admin', 'artist_manager', 'artist'], 'Invalid role').required('This field is required'),
};

export const registerValidationSchema = Yup.object({
    ...baseSchema,
    password: passwordSchema,
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

export const editValidationSchema = Yup.object(baseSchema);
