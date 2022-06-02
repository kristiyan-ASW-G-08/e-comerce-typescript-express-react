import express from 'express';
import authenticationHandler from '@src/middleware/authenticationHandler';
import ReviewValidator from '@eco/common/source/schemaValidators/ReviewValidator';
import validationHandler from '@src/middleware/validationHandler';
import { postReview, getReviews } from './controllers';
import paginationHandler from '@src/middleware/paginationHandler';

const router = express.Router();

router.post(
  '/products/:productId/review',
  authenticationHandler,
  validationHandler([{ schema: ReviewValidator, target: 'body' }]),
  postReview,
);

router.get('/products/:productId/reviews', paginationHandler, getReviews);

export default router;
