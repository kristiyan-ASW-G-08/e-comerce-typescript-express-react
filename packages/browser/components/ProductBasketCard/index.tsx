import { FC } from 'react';
import Product from '@eco/common/source/types/Product';
import Link from 'next/link';
import cloudinary from '../../cloudinary';
import { AdvancedImage } from '@cloudinary/react';
import { useDispatch } from 'react-redux';
import { addProduct, BasketProduct, removeProduct } from 'slices/BasketSlice';
import ReviewStars from '../ReviewStars';
const ProductBasketCard: FC<BasketProduct> = ({
  name,
  _id,
  price,
  image,
  quantity,
  stock,
}) => {
  const dispatch = useDispatch();
  const cloudinaryImage = cloudinary.image(image).setVersion('1650962083');
  return (
    <article className="flex justify-center">
      <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
        <AdvancedImage
          className=" h-24 w-24 object-contain"
          cldImg={cloudinaryImage}
          alt=""
        />
        <div className="p-6 flex flex-col justify-start space-y-3">
          <h5 className="text-2xl font-medium mb-2">{name}</h5>
          <p className="text-gray-600 text-1xl">${price}</p>
          <div className="space-x-4 flex">
            <button
              onClick={() => {
                dispatch(removeProduct(_id));
              }}
              className="bg-red-400 text-neutral-50 text-1xl p-1"
            >
              Remove
            </button>

            <button
              onClick={() => {
                dispatch(
                  addProduct({ name, _id, price, image, quantity, stock }),
                );
              }}
              className="bg-blue-400 text-neutral-50 text-1xl  p-1"
            >
              Add
            </button>
            <p>{quantity}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductBasketCard;
