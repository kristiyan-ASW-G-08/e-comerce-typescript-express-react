import { FC } from 'react';
import { BasketProduct } from 'slices/BasketSlice';
interface BasketProps {
  product: BasketProduct;
}
const Basket: FC<BasketProps> = ({ product }) => {
  return <div>{product.name}</div>;
};
export default Basket;
