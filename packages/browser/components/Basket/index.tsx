import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { BasketProduct } from 'slices/BasketSlice';
import BasketItem from './BasketItem';
interface BasketProps {
  products: BasketProduct[];
}
const Basket: FC<BasketProps> = ({ products }) => {
  return (
      <button>
        <FontAwesomeIcon
          className="text-2xl text-neutral-50"
          icon={faCartShopping}
        />
        <p className="absolute p-3 h-4 w-4 flex items-center justify-center text-neutral-50 rounded-full bg-red-400 -translate-y-10 translate-x-4">
          {products.length}
        </p>
      </button>
  );
};
export default Basket;
