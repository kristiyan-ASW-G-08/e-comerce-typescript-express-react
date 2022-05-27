import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { BasketProduct } from 'slices/BasketSlice';
import BasketItem from './BasketItem';
interface BasketProps {
  products: BasketProduct[];
}
const Basket: FC<BasketProps> = ({ products }) => {
  const firstThreeProducts = products.slice(0, 2);
  return (
    <div>
      <button>
        <FontAwesomeIcon icon={faCartShopping} />
        Basket
      </button>
      <div className="absolute">
        {firstThreeProducts.map(product => (
          <BasketItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default Basket;
