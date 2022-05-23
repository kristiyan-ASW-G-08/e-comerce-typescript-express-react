import ValidationError from '@eco/common/source/types/ValidationError';

import { FormikErrors, FormikValues } from 'formik';
import transformValidationErrors from './transformValidationErrors';

type setErrors = (validationErrors: FormikErrors<FormikValues>) => void;

const formErrorHandler = (
  validationErrors: ValidationError[],
  setErrors: setErrors,
  setNotification: () => void,
) => {
};

export default formErrorHandler;
