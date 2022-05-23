import * as yup from 'yup';

const UserValidator = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email()
    .required('Email is Required'),
  password: yup
    .string()
    .trim()
    .min(12)
    .required('Password is Required'),
  confirmPassword: yup
    .string()
    .trim()
    .min(12)
    .oneOf([yup.ref('password')], "Passwords don't match")
    .required('Repeat your password'),
});

export default UserValidator;
