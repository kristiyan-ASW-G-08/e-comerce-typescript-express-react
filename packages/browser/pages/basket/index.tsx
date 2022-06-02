import Product from '@eco/common/source/types/Product';
import { FC, useEffect } from 'react';
import {
  addProduct,
  BasketProduct,
  removeProduct,
} from '../../slices/BasketSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductBasketCard from '@/components/ProductBasketCard';
import Link from 'next/link';
const Basket: FC = () => {
  const basket = useSelector(
    (state: { basket: BasketProduct[] }) => state.basket,
  );

  return (
    <section className="flex flex-col md:flex-row justify-between p-10">
      <div className="pt-24 flex flex-col ">
        <div className=" rounded-lg bg-white shadow-lg text-center p-10 space-y-4">
          <h1 className="text-2xl font-bold">
            Subtotal ({basket.length}) Items
          </h1>
          <p>
            Final Price $
            {basket.reduce(
              (finalPrice, product) =>
                finalPrice + product.price * product.quantity,
              0,
            )}
          </p>
          {basket.length > 0 ? (
            <Link href="/checkout">
              <a className="block bg-blue-400 p-2 px-10 text-neutral-50">
                Proceed to Checkout
              </a>
            </Link>
          ) : (
            <button className="bg-blue-400 p-2 px-10 text-neutral-50">
              Your Cart is Empty
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start p-10 space-y-5">
        <h1 className="text-5xl font-bold">Shopping Cart</h1>
        {basket.map(product => (
          <ProductBasketCard key={product._id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default Basket;
