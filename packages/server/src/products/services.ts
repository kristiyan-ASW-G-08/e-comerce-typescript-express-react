import Product from '@products/Product';
import ProductType from '@customTypes/ProductType';
import getResource from '@utilities/getResource';

export const getProductById = async (productId: string): Promise<ProductType> =>
  getResource<ProductType>(Product, { name: '_id', value: productId });

export default getProductById;
