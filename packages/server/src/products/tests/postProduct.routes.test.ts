import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import mockFs from 'mock-fs';
import app from '../../../src/app';
import User from '@users/User';
import connectToDB from '@utilities/connectToDB';
import Product from '@products/Product';
import deleteFle from '@utilities/deleteFile';

jest.mock('@utilities/uploadToCloudinary', () =>
  jest.fn(() => Promise.resolve({ public_id: 'public_id' })),
);

jest.mock('@utilities/deleteFromCloudinary');

jest.mock('@utilities/deleteFile');

const port = process.env.PORT || 8080;
const mockTemplate = 'MockTemplate';

describe('product routes', () => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ol9wi.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  const email = 'email';
  const password = 'somePassword';
  const name = 'ProductName';
  const brand = 'ProductName';
  const price = 1000;
  const stock = 1000;
  const description = 'ProductName';
  const category = 'TV';
  const specifications = [
    { name, description },
    { name, description },
    { name, description },
    { name, description },
    { name, description },
  ];
  JSON.parse = jest.fn().mockImplementation(() => specifications);
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
    await Product.deleteMany({}).exec();
    await User.deleteMany({}).exec();
  });
  beforeAll(async () => {
    await mongoose.disconnect();
    await connectToDB(mongoURI);
    app.listen(port);
    await Product.deleteMany({}).exec();
    await User.deleteMany({}).exec();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('post /products', () => {
    it('should create a new product', async () => {
      jest.spyOn(jwt, 'verify').mockImplementation(() => ({
        userId: 'userId',
        isAdmin: true,
      }));
      // expect.assertions(1);

      mockFs({
        './images': {
          'test.jpg': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
        },
      });
      const response = await request(app)
        .post('/products')
        .field({
          name,
          brand,
          price,
          stock,
          description,
          category,
          specifications: JSON.stringify(specifications),
        })
        .attach('files', './images/test.jpg')
        .attach('files', './images/test.jpg')
        .attach('files', './images/test.jpg')
        .set('Authorization', `Bearer ${token}`)
        .set('content-type', 'multipart/form-data');
      expect(response.status).toBe(201);
    });
  });
});
