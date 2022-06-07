import mongoose from 'mongoose';
import Product from '@products/Product';
import ProductType from '@customTypes/ProductType';
import connectToDB from '@utilities/connectToDB';

describe('Product', (): void => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ol9wi.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  const name = 'name';
  const description = 'description';
  const category = 'category';
  const price = 1000;
  const brand = 'brand';
  const stock = 1000;
  const hasDeal = false;
  const dealPrice = 1000;
  const images = ['imageSrc'];
  const specifications = [{ name, description }];
  const numReviews = 10;
  const rating = 0;
  beforeAll(
    async (): Promise<void> => {
      await connectToDB(mongoURI);
      await Product.deleteMany({}).exec();
    },
  );
  afterEach(
    async (): Promise<void> => {
      await Product.deleteMany({}).exec();
    },
  );
  afterAll(
    async (): Promise<void> => {
      await mongoose.disconnect();
    },
  );

  it('should create a new product', async (): Promise<void> => {
    expect.assertions(8);
    const product: ProductType = new Product({
      name,
      brand,
      price,
      stock,
      description,
      category,
      specifications,
      images,
    });
    await expect(product.save()).resolves.not.toThrowError();
    expect(product.name).toMatch(name);
    expect(product.brand).toMatch(brand);
    expect(product.price).toEqual(price);
    expect(product.stock).toEqual(stock);
    expect(product.description).toMatch(description);
    expect(product.category).toMatch(category);
    expect(product.name).toMatch(name);
  });
});
