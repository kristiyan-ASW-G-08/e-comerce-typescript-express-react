import mongoose from 'mongoose';
import request from 'supertest';
import mockFs from 'mock-fs';
import app from '../../app';
import connectToDB from '@utilities/connectToDB';

import Order from '../Order';
import OrderType from '@src/types/OrderType';

jest.mock('@utilities/deleteFile');
const port = process.env.PORT || 8080;   

describe('product routes', () => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ol9wi.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;

  beforeEach(async () => {
    await Order.deleteMany({}).exec();
  });
  afterEach(async () => {
    mockFs.restore();
    await Order.deleteMany({}).exec();
  });
  beforeAll(async () => {
    await mongoose.disconnect();
    await connectToDB(mongoURI);
    app.listen(port);
    await Order.deleteMany({}).exec();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('get /products', () => {
    afterEach(jest.clearAllMocks);

    it('should return products by category', async () => {
      expect.assertions(1);
      const user = new mongoose.Types.ObjectId();
      const products = [
        { quantity: 1, productId: new mongoose.Types.ObjectId() },
      ];
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
      const response = await request(app).get(`/orders/${order._id}`);
      expect(response.status).toBe(200);
    });
  });
});
