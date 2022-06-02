import { Request, Response, NextFunction } from 'express';
import passErrorToNext from '@utilities/passErrorToNext';
import getProductById from '@src/products/services';
import includesId from '@src/utilities/includesId';
import { getUserById } from '@src/users/services';
import { errors } from '@src/utilities/RESTError';
import Review from './Review';
import ReviewType from '@src/types/ReviewType';
import getPaginationURLs from '@src/utilities/getPaginationURLs';
import findDocs from '@src/utilities/findDocs';

export const postReview = async (
  { body: { content, rating }, params: { productId }, userId }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await getUserById(userId);
    const hasReviewed = includesId(user.productReviews, productId);
    console.log(hasReviewed);
    if (hasReviewed) {
      const { status, message } = errors.Unauthorized;
      res.status(status).json({ data: { message } });
    } else {
      //@ts-ignore
      user.productReviews = [...user.productReviews, productId];
      user.save();
      const review = await new Review({
        content,
        rating,
        product: productId,
        user: userId,
      }).save();
      const productReviews = await Review.find({ product: productId });
      const product = await getProductById(productId);

      product.numReviews = product.numReviews + 1;

      product.rating =
        productReviews.reduce(
          (acc: number, reviewItem: ReviewType) => reviewItem.rating + acc,
          0,
        ) / product.numReviews;

      product.save();
      res.status(200).json({ data: { review } });
    }
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const getReviews = async (
  { pagination, params: { productId } }: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit } = pagination;
    console.log({ product: productId });
    const { documents, count } = await findDocs<ReviewType>({
      model: Review,
      //@ts-ignore
      pagination,
      //@ts-ignore
      query: { product: productId },
    });
    const { prevPage, nextPage } = getPaginationURLs({
      page,
      urlExtension: `products/${productId}/reviews`,
      count,
      queries: {
        limit,
      },
    });
    console.log(documents);
    res.status(200).json({
      data: {
        reviews: documents,
        links: {
          next: nextPage,
          prev: prevPage,
        },
      },
    });
  } catch (err) {
    passErrorToNext(err, next);
  }
};
