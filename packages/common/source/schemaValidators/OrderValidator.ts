import * as yup from 'yup';

const OrderValidator = yup.object().shape({
  products: yup
    .array()
    .min(1)
    .of(yup.string()),
  address: yup.object().shape({
    address: yup
      .string()
      .trim()
      .required(),
    city: yup
      .string()
      .trim()
      .required(),
    zip: yup
      .string()
      .trim()
      .required(),
    country: yup
      .string()
      .trim()
      .required(),
  }),
  fullName: yup
    .string()
    .trim()
    .required(),
  phoneNumber: yup
    .string()
    .trim()
    .required(),
  paymentMethod: yup
    .string()
    .oneOf(['Paypal', 'Debit or Credit Card'])
    .trim()
    .required(),
  shippingPrice: yup.number().required(),
  productsPrice: yup.number().required(),
  totalPrice: yup.number().required(),
});
export default OrderValidator;
