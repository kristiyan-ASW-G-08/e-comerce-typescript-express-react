import { Response } from 'express';

import { Document } from 'mongoose';
import RESTError, { errors } from '@utilities/RESTError';
import ValidationError from '@eco/common/source/types/ValidationError';

const duplicationErrorHandler = (
  duplicationErrors: any,
  res: Response,
): void => {
  if (duplicationErrors.errors) {
    const validationErrors: ValidationError[] = Object.values(
      duplicationErrors.errors,
    ).map(
      // @ts-ignore
      ({ value, path }: { value: string; path: string }): ValidationError => ({
        path,
        message: `${value} is already taken`,
      }),
    );
    const { status } = errors.Conflict;
    res.status(status).json({ data: { validationErrors } });
  }
};
export default duplicationErrorHandler;
