import express from 'express';
import multer from 'multer';
import { signUp, logIn } from '@users/controller';
import validationHandler from '@src/middleware/validationHandler';
import authenticationHandler from '@src/middleware/authenticationHandler';
import validators from '@eco/common/source/schemaValidators/validators';
import paginationHandler from '@src/middleware/paginationHandler';
import fileFilter from '@customMiddleware/fileFilter';
import storage from '@customMiddleware/fileStorage';

const router = express.Router();

router.post(
  '/users',
  validationHandler([
    { schema: validators.UserSignUpValidator, target: 'body' },
  ]),
  signUp,
);

router.post(
  '/users/user/tokens',
  validationHandler([
    { schema: validators.UserLoginValidator, target: 'body' },
  ]),
  logIn,
);

// router.post(
//   '/users/user',
//   validationHandler([{ schema: validators.EmailValidator, target: 'body' }]),
//   requestPasswordResetEmail,
// );

// router.patch('/users/user/:token/confirm', verifyEmail);

// router.patch(
//   '/users/user/reset',
//   authenticationHandler,
//   validationHandler([
//     { schema: validators.ResetPasswordValidator, target: 'body' },
//   ]),
//   resetPassword,
// );
export default router;
