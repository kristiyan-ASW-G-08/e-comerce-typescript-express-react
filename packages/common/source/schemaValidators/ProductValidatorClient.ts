import ProductValidator from './ProductValidator';
import imageFileTypes from '../fileTypes/imageFileTypes';
import * as yup from 'yup';
const ProductValidatorClient = ProductValidator.concat(
  yup.object().shape({
    files: yup
      .array()
      .required('Images are Required')
      .min(3, 'Add More Images. Minimum of Three.')
      .max(5, 'Remove Some Images. Maximum of Five.')
      .of(
        yup
          .mixed()
          .required('Image is required!')
          .test(
            'fileType',
            'Upload an Image. Current file type is not supported',
            value => {
            
              if (value && value.type) {
                return imageFileTypes.includes(value.type);
              } else if (value && value.file) {
                console.log(value, 'ImageValue');
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
  }),
);

export default ProductValidatorClient;
