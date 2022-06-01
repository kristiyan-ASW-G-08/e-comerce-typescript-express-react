import { FC } from 'react';
import Product from '@eco/common/source/types/Product';
import Link from 'next/link';
import cloudinary from '../../cloudinary';
import { AdvancedImage } from '@cloudinary/react';
import { useDispatch } from 'react-redux';
import { addProduct } from 'slices/BasketSlice';
const ProductCard: FC<Product> = ({
  name,
  _id,
  price,
  stock,
  images,
  brand,
  hasDeal,
  dealPrice,
}) => {
  const dispatch = useDispatch();
  const image = cloudinary
    .image(images[images.length - 1])
    .setVersion('1650962083');
  return (
    <article className="max-w-sm rounded overflow-hidden shadow-lg hover:scale-105 hover:bg-neutral-100 transition  ease-in-out delay-150 ">
      <Link href={`/products/${_id}`}>
        <a>
          <AdvancedImage
            className=" h-56 w-64 object-contain"
            cldImg={image}
            alt=""
          />
          <div className="px-6 py-4">
            <h4 className="font-bold text-xl mb-2">{name}</h4>
            <p className="font-bold text-sm text-neutral-400 mb-2">
              {stock > 0 ? 'Available' : ''}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="px-6 pt-4 pb-2">
              <p
                className={`inline-block text-red-400  px-3 py-1  font-semibold  mr-2 mb-2 text-1xl space-x-3`}
              >
                <span className={`${hasDeal ? 'line-through' : ''}`}>
                  ${price}
                </span>
                {hasDeal ? <span>Currently ${dealPrice}</span> : ''}
              </p>
            </div>
          </div>
        </a>
      </Link>
      <button
        className="w-full bg-red-400 text-neutral-50 py-3 hover:bg-blue-400"
        onClick={() => {
          dispatch(
            addProduct({
              name,
              quantity: 1,
              price,
              _id,
              image: images[images.length - 1],
              stock,
            }),
          );
        }}
      >
        Add To Cart
      </button>
    </article>
  );
};

export default ProductCard;
