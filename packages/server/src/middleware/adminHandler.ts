import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import RESTError, { errors } from '@utilities/RESTError';

const adminHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { SECRET } = process.env;
  const authHeader = req.get('Authorization');
  const { status, message } = errors.Unauthorized;
  const error = new RESTError(status, message);
  if (!authHeader) {
    throw error;
  }
  const token = authHeader.split(' ')[1];
  // @ts-ignore
  const { isAdmin } = verify(token, SECRET);
  if (isAdmin === false) {
    throw error;
  }
  next();
};
export default adminHandler;