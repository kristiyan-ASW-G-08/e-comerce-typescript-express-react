import Order from '@orders/Order';
import OrderType from '@customTypes/OrderType';
import getResource from '@utilities/getResource';

export const getOrderById = async (orderId: string): Promise<OrderType> =>
  getResource<OrderType>(Order, { name: '_id', value: orderId });

export default getOrderById;
