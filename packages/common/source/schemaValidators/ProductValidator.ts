import imageFileTypes from 'source/fileTypes/imageFileTypes';
import * as yup from 'yup';

const Product = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(),
  price: yup.number().required(),
  description: yup
    .string()
    .trim()
    .required(),
  category: yup
    .string()
    .trim()
    .oneOf([
      'Phones & Tablets',
      'Laptops & Computers',
      'TV',
      'Audio',
      'Peripherals',
    ])
    .required(),
  images: yup
    .array()
    .required()
    .min(3, 'Add More Images. Minimum Three')
    .max(5, 'Remove Some Images. Maximum Five')
    .of(
      yup
        .mixed()
        .required('Cover is required!')
        .test(
          'fileType',
          'Upload an Image. Current file type is not supported',
          value => {
            if (value && value.type) {
              return imageFileTypes.includes(value.type);
            } else if (value && value.file) {
              return imageFileTypes.includes(value.file.mimetype);
            } else if (value && value.then) {
              //@ts-ignore
              value.then(({ file }) => {
                return imageFileTypes.includes(file.mimetype);
              });
            }
            return false;
          },
        ),
    ),
  specifications: yup.array().of(
    yup.object().shape({
      path: yup.string().required(),
      value: yup.string().required(),
    }),
  ),
});
export default Product;
