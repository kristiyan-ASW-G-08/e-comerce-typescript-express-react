import { BasketProduct } from 'slices/BasketSlice';

const sumProductPrices = (products: BasketProduct[]) => {
  return products.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0,
  );
};

export default sumProductPrices;
