import imageFileTypes from '../fileTypes/imageFileTypes';
import * as yup from 'yup';
export const categories = [
  'Phones and  Tablets',
  'Laptops and  Computers',
  'TV',
  'Audio',
  'Peripherals',
];
const Product = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(),
  brand: yup
    .string()
    .trim()
    .required(),
  price: yup
    .number()
    .positive()
    .required(),
  stock: yup
    .number()
    .positive()
    .required(),
  description: yup
    .string()
    .trim()
    .required(),
  category: yup
    .string()
    .trim()
    .oneOf(categories)
    .required(),
  specifications: yup
    .array()
    .required('Specifications are Required')
    .min(5, 'Add at least 5 specifications')
    .of(
      yup.object().shape({
        name: yup.string().required('Specification Name is required'),
        description: yup
          .string()
          .required('Specification Description is required'),
      }),
    ),
});
export default Product;
