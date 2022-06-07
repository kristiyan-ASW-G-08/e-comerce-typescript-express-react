import { getProduct } from '@src/products/controllers';
import getProductById from '@src/products/services';
import passErrorToNext from '@src/utilities/passErrorToNext';
import { Request, Response, NextFunction } from 'express';
import Order from './Order';
import getOrderById from './services';

export const postOrder = async (
  {
    body: {
      phoneNumber,
      fullName,
      products,
      address,
      paymentMethod,
      shippingPrice,
      productsPrice,
      totalPrice,
      paypalDetails,
    },
    userId,
  }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const order = await new Order({
      fullName,
      phoneNumber,
      user: userId,
      products,
      address,
      paymentMethod,
      shippingPrice,
      productsPrice,
      totalPrice,
      paypalDetails: paypalDetails,
    });
    order.markModified('paypalDetails');
    order.save();
    res.status(200).json({ data: { order } });
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const getOrder = async (
  { params: { orderId } }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    //  Bug: Mongoose doesn't populate products
    // const order = await Order.findById(orderId).populate({
    //   path: 'products',
    //   populate: {
    //     model: 'Product',
    //     path: 'productId',
    //   },
    // });

    const order = await getOrderById(orderId);

    let products: any = [];
    //@ts-ignore
    for await (const { productId, quantity } of order.products) {
      const product = await getProductById(productId);
      products = [...products, { product, quantity }];
    }
    res.status(200).json({
      data: {
        order,
        products,
      },
    });
  } catch (err) {
    passErrorToNext(err, next);
  }
};
