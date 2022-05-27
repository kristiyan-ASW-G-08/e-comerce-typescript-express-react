import imageFileTypes from '../fileTypes/imageFileTypes';
import * as yup from 'yup';

const FilesValidator = yup.object().shape({
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
            console.log(value);
            if (value && value.type) {
              return imageFileTypes.includes(value.type);
            } else if (value && value.mimetype) {
              return imageFileTypes.includes(value.mimetype);
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
});
export default FilesValidator;
