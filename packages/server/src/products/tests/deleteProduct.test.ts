import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import mockFs from 'mock-fs';
import app from '../../app';
import User from '@users/User';
import connectToDB from '@utilities/connectToDB';
import Product from '@products/Product';

jest.mock('@utilities/deleteFile');
const port = process.env.PORT || 8080;
const mockTemplate = 'MockTemplate';

describe('product routes', () => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ol9wi.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  const name = 'ProductName';
  const description = 'ProductName';
  const email = 'email';
  const password = 'somePassword';
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
  const SECRET = process.env.SECRET;

  beforeEach(async () => {
    await Product.deleteMany({}).exec();
  });
  afterEach(async () => {
    mockFs.restore();
    await Product.deleteMany({}).exec();
  });
  beforeAll(async () => {
    await mongoose.disconnect();
    await connectToDB(mongoURI);
    app.listen(port);
    await Product.deleteMany({}).exec();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('delete /product/:productId', () => {
    afterEach(jest.clearAllMocks);

    it('should delete a product', async () => {
      expect.assertions(1);
      const product = await new Product({
        name: 'ProductName',
        brand: 'ProductName',
        price: 1000,
        stock: 1000,
        description: 'ProductName',
        category: 'TV',
        specifications: [
          { name, description },
          { name, description },
          { name, description },
          { name, description },
          { name, description },
        ],
      }).save();
      const productId = product._id.toString();
      const response = await request(app)
        .delete(`/products/${productId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(204);
    });

    it('should return 401', async () => {
      expect.assertions(1);
      expect.assertions(1);
      const product = await new Product({
        name: 'ProductName',
        brand: 'ProductName',
        price: 1000,
        stock: 1000,
        description: 'ProductName',
        category: 'TV',
        specifications: [
          { name, description },
          { name, description },
          { name, description },
          { name, description },
          { name, description },
        ],
      }).save();
      const productId = product._id.toString();
      const response = await request(app).delete(`/products/${productId}`);
      expect(response.status).toBe(401);
    });

    it('should be 404', async () => {
      expect.assertions(1);
      const response = await request(app)
        .delete(`/products/${new mongoose.Types.ObjectId()}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
    });
  });
});
