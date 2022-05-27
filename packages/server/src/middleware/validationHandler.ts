import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'yup';
import Validator from '@customTypes/Validator';
import CustomValidationError from '@eco/common/source/types/ValidationError';
import RESTError, { errors } from '@utilities/RESTError';

const validationHandler = (
  validators: Validator[],
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      for await (const { schema, target } of validators) {
        if (target === 'req') {
          await schema.validate(req, {
            abortEarly: false,
          });
        } else {
          const validationTarget = req[target];
          await schema.validate(validationTarget, {
            abortEarly: false,
          });
        }
      }
      next();
    } catch (err) {
      // @ts-ignore
      const validationErrors = err.inner.map(
        ({ path, message }: ValidationError): CustomValidationError => ({
          path,
          message,
        }),
      );
      const { status, message } = errors.BadRequest;
      next(new RESTError(status, message, validationErrors));
    }
  };
};
export default validationHandler;
