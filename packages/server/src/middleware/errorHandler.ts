import { Response, Request, NextFunction } from 'express';
import RESTError from '@utilities/RESTError';
import logger from '@utilities/logger';

const errorHandler = (
  error: RESTError,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log(error);
  logger.error(RESTError);
  const status = error.status || 500;
  const { message, validationErrors } = error;
  const data = validationErrors ? { validationErrors, message } : { message };
  console.log(data);
  res.status(status).json({ data });
};
export default errorHandler;
