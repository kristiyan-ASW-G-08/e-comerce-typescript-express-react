import express from 'express';
import authenticationHandler from '@src/middleware/authenticationHandler';
import ReviewValidator from '@eco/common/source/schemaValidators/ReviewValidator';
import validationHandler from '@src/middleware/validationHandler';
import { postReview } from './controllers';

const router = express.Router();

router.post(
  '/products/:productId/review',
  authenticationHandler,
  validationHandler([{ schema: ReviewValidator, target: 'body' }]),
  postReview,
);

export default router;
