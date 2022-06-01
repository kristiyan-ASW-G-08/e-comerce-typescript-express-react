import { Request, Response, NextFunction } from 'express';
import passErrorToNext from '@utilities/passErrorToNext';
import getProductById from '@src/products/services';
import includesId from '@src/utilities/includesId';
import { getUserById } from '@src/users/services';
import { errors } from '@src/utilities/RESTError';
import Review from './Review';
import ReviewType from '@src/types/ReviewType';

export const postReview = async (
  { body: { content, rating }, params: { productId }, userId }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await getUserById(userId);
    const hasReviewed = includesId(user.productReviews, productId);
    if (hasReviewed) {
      const { status, message } = errors.Unauthorized;
      res.status(status).json({ data: { message } });
    } else {
      const review = await new Review({
        content,
        rating,
        product: productId,
      }).save();
      const productReviews = await Review.find({ product: productId });
      const product = await getProductById(productId);

      product.numReviews = product.numReviews + 1;

      product.rating =
        productReviews.reduce(
          (acc: number, reviewItem: ReviewType) => reviewItem.rating + acc,
          0,
        ) /
          product.numReviews +
        1;

      product.save();
      res.status(200).json({ data: { review } });
    }
  } catch (err) {
    passErrorToNext(err, next);
  }
};
