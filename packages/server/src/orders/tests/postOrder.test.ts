import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import mockFs from 'mock-fs';
import app from '../../app';
import User from '@users/User';
import connectToDB from '@utilities/connectToDB';
import Product from '@products/Product';
import deleteFle from '@utilities/deleteFile';
jest.mock('@products/Product');
jest.mock('@utilities/uploadToCloudinary', () =>
  jest.fn(() => Promise.resolve({ public_id: 'public_id' })),
);

jest.mock('@utilities/deleteFromCloudinary');

jest.mock('@utilities/deleteFile');

Product as jest.MockedClass<typeof Product>;
const port = process.env.PORT || 8080;
const mockTemplate = 'MockTemplate';

describe('product routes', () => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ol9wi.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  const email = 'email';
  const password = 'somePassword';
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

  const SECRET = process.env.SECRET;

  let token: string;
  beforeEach(async () => {
    await User.deleteMany({}).exec();
    const user = new User({
      email,
      password,
    });
    await user.save();
    token = jwt.sign(
      {
        userId: user._id,
        isAdmin: true,
      },
      SECRET,
      { expiresIn: '24h', algorithm: 'HS256' },
    );
  });
  afterEach(async () => {
    mockFs.restore();
    await User.deleteMany({}).exec();
  });
  beforeAll(async () => {
    await mongoose.disconnect();
    await connectToDB(mongoURI);
    app.listen(port);
    await User.deleteMany({}).exec();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('post /orders', () => {
    afterEach(jest.clearAllMocks);
    it('should create a new order', async () => {
      const response = await request(app)
        .post('/orders')
        .field({
          user,
          products,
          address,
          fullName,
          phoneNumber,
          shippingPrice,
          productsPrice,
          totalPrice,
        })
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(201);
    });

    it('should not create a order when user is not authenticated', async () => {
      const response = await request(app)
        .post('/orders')
        .field({
          user,
          products,
          address,
          fullName,
          phoneNumber,
          shippingPrice,
          productsPrice,
          totalPrice,
        })
        .set('Authorization', `Bearer ${token}`)
        .set('content-type', 'multipart/form-data');
      expect(response.status).toBe(401);
    });

    it('should not create a product when user is not admin', async () => {
      const response = await request(app)
        .post('/orders')
        .field({
          user,
          products,
          address,
          fullName,
          phoneNumber,
          shippingPrice,
          productsPrice,
          totalPrice,
        })
        .set('Authorization', `Bearer ${token}`)
        .set('content-type', 'multipart/form-data');
      expect(response.status).toBe(403);
    });
  });
});
