import * as yup from 'yup';
import { category } from '../types/Product';

interface SortStringValidatorType {
  category: category;
}

const SortStringValidator = yup.object<SortStringValidatorType>().shape({
  category: yup
    .string()
    .trim()
    .oneOf([
      'Phones and Tablets',
      'Laptops and Computers',
      'TV',
      'Audio',
      'Peripherals',
    ]),

  // price: yup.number().positive(),
  // limit: yup
  //   .number()
  //   .integer()
  //   .min(1)
  //   .max(50),
  // page: yup
  //   .number()
  //   .min(1)
  //   .integer(),
});

export default SortStringValidator;
