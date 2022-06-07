import mongoose from 'mongoose';
import Order from '@orders/Order';
import OrderType from '@customTypes/OrderType';
import connectToDB from '@utilities/connectToDB';

describe('Product', (): void => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ol9wi.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  const user = new mongoose.Types.ObjectId();
  const products = [{ quantity: 1, productId: new mongoose.Types.ObjectId() }];
  const address = {
    address: 'someAddress',
    city: 'someAddress',
    zip: 'someAddress',
    country: 'someAddress',
  };
  const fullName = 'John Doe';
  const phoneNumber = 'someNumber';
  const shippingPrice = 100;
  const productsPrice = 1000;
  const totalPrice = 1100;
  beforeAll(
    async (): Promise<void> => {
      await connectToDB(mongoURI);
      await Order.deleteMany({}).exec();
    },
  );
  afterEach(
    async (): Promise<void> => {
      await Order.deleteMany({}).exec();
    },
  );
  afterAll(
    async (): Promise<void> => {
      await mongoose.disconnect();
    },
  );

  it('should create a new order', async (): Promise<void> => {
    expect.assertions(6 );
    const order: OrderType = new Order({
      user,
      products,
      address,
      fullName,
      phoneNumber,
      shippingPrice,
      productsPrice,
      totalPrice,
    });
    await expect(order.save()).resolves.not.toThrowError();
    expect(order.address).toEqual(address);
    expect(order.productsPrice).toEqual(productsPrice);
    expect(order.totalPrice).toEqual(totalPrice);
    expect(order.fullName).toMatch(fullName);
    expect(order.shippingPrice).toEqual(shippingPrice);
  });
});
