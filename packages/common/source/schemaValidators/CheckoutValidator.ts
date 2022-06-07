import * as yup from 'yup';

const phoneRegExp = '';

const CheckoutValidator = yup.object().shape({
  address: yup
    .string()
    .trim()
    .required(),
  phoneNumber: yup
    .string()
    .trim()
    // .matches(phoneRegExp, 'Phone number is not valid')
    .required(),
  city: yup
    .string()
    .trim()
    .required(),
  zip: yup
    .string()
    .trim()
    .required(),
  fullName: yup
    .string()
    .trim()
    .required(),
  country: yup
    .string()
    .trim()
    .required(),
});
export default CheckoutValidator;
