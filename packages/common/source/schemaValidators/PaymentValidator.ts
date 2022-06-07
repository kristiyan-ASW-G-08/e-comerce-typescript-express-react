import * as yup from 'yup';

const PaymentValidator = yup.object().shape({
  method: yup
    .string()
    .trim()
    .oneOf(['Paypal', 'Debit or Credit Card'])
    .required('Please choose a Payment method!'),
});
export default PaymentValidator;
