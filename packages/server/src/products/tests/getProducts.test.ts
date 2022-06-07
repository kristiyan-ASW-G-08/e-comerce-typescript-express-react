import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import mockFs from 'mock-fs';
import app from '../../app';
import User from '@users/User';
import connectToDB from '@utilities/connectToDB';
import Product from '@products/Product';
import deleteFle from '@utilities/deleteFile';

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

  const SECRET = process.env.SECRET;

  beforeEach(async () => {
    await Product.deleteMany({}).exec();
    const name = 'ProductName';
    const description = 'ProductName';
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

  describe('get /products', () => {
    afterEach(jest.clearAllMocks);

    it('should return products by category', async () => {
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
      const response = await request(app).get(`/products?category=TV`);
      expect(response.status).toBe(200);
    });
    it('should return products by category', async () => {
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
      const response = await request(app).get(`/products?category=TV`);
      expect(response.status).toBe(200);
    });
    it('should get products by a category', async () => {
      expect.assertions(1);
      const product = await new Product({
        name: 'ProductName',
        brand: 'ProductName',
        price: 1000,
        stock: 1000,
        description: 'ProductName',
        category: 'Audio',
        specifications: [
          { name, description },
          { name, description },
          { name, description },
          { name, description },
          { name, description },
        ],
      }).save();
      const response = await request(app).get(`/products?category=Audio`);
      expect(response.status).toBe(200);
    });
    it('should return products by category', async () => {
      expect.assertions(1);
      const product = await new Product({
        name: 'ProductName',
        brand: 'ProductName',
        price: 1000,
        stock: 1000,
        description: 'ProductName',
        category: 'Peripherals',
        specifications: [
          { name, description },
          { name, description },
          { name, description },
          { name, description },
          { name, description },
        ],
      }).save();
      const response = await request(app).get(`/products?category=Peripherals`);
      expect(response.status).toBe(200);
    });
    it('should return products by category', async () => {
      expect.assertions(1);
      const product = await new Product({
        name: 'ProductName',
        brand: 'ProductName',
        price: 1000,
        stock: 1000,
        description: 'ProductName',
        category: 'Phones and Tablets',
        specifications: [
          { name, description },
          { name, description },
          { name, description },
          { name, description },
          { name, description },
        ],
      }).save();
      const response = await request(app).get(
        `/products?category=Phones and Tablets`,
      );
      expect(response.status).toBe(200);
    });
    it('should return products by category', async () => {
      expect.assertions(1);
      const product = await new Product({
        name: 'ProductName',
        brand: 'ProductName',
        price: 1000,
        stock: 1000,
        description: 'ProductName',
        category: 'Laptops and Computers',
        specifications: [
          { name, description },
          { name, description },
          { name, description },
          { name, description },
          { name, description },
        ],
      }).save();
      const response = await request(app).get(
        `/products?category=Laptops and Computers`,
      );
      expect(response.status).toBe(200);
    });
    it('should return 404 when the product category is not recognized', async () => {
      expect.assertions(1);
      const product = await new Product({
        name: 'ProductName',
        brand: 'ProductName',
        price: 1000,
        stock: 1000,
        description: 'ProductName',
        category: 'Peripherals',
        specifications: [
          { name, description },
          { name, description },
          { name, description },
          { name, description },
          { name, description },
        ],
      }).save();
      const response = await request(app).get(
        `/products?category=NotRecognized`,
      );
      expect(response.status).toBe(400);
    });
  });
});
