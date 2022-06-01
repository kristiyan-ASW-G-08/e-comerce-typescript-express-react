import * as yup from 'yup';

const ReviewValidator = yup.object().shape({
  content: yup
    .string()
    .trim()
    .required(),
  rating: yup.number().required(),
});
export default ReviewValidator;
