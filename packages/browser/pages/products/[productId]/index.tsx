import Product from '@eco/common/source/types/Product';
import { FC, useEffect, useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import cloudinary from '../../../cloudinary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import ReviewForm from '@/components/ReviewForm';
import { addProduct } from '../../../slices/BasketSlice';
import { useDispatch, useSelector } from 'react-redux';
const ProductPage: FC<Product> = ({
  name,
  images,
  specifications,
  description,
  stock,
  price,
  category,
  _id,
}) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state.auth);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const cloudniaryImages = images
    .slice()
    .reverse()
    .map(image => {
      return cloudinary.image(image).setVersion('1650962083');
    });
  const imageComponents = cloudniaryImages.map(image => {
    return (
      <AdvancedImage
        className=" h-56 w-64 object-contain"
        cldImg={image}
        alt=""
      />
    );
  });
  return (
    <section>
      <div className="h-auto w-full md:flex md:flex-row md:p-10 space-x-28">
        <div>
          <div className="flex justify-center items-center md:flex-row space-y-5 space-x-8 p-5 flex-col w-full md:w-3/6">
            <div className="hidden md:flex flex-col space-y-3">
              {cloudniaryImages.map((image, index) => {
                return (
                  <button onClick={() => setCurrentImage(index)}>
                    <AdvancedImage
                      className=" h-24 w-24 object-contain"
                      cldImg={image}
                      alt=""
                    />
                  </button>
                );
              })}
            </div>
            {imageComponents[currentImage]}

            <div className="md:hidden">
              {images.map((_, index) => {
                return (
                  <button
                    key={index}
                    data-testid="button-1"
                    onClick={() => setCurrentImage(index)}
                    className="px-3 text-slate-600"
                  >
                    {' '}
                    {currentImage === index ? (
                      <FontAwesomeIcon height={12} icon={faCircle} />
                    ) : (
                      <FontAwesomeIcon height={12} icon={faDotCircle} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-4/6 flex flex-col space-y-5">
          <h1 className="font-bold">{name}</h1>
          <Link href={`/products?category=${category}`}>
            <a className="text-yellow-400 font-bold hover:text-red-400">
              {category}
            </a>
          </Link>

          <p>{description}</p>
          <div className="flex flex-row space-x-10">
            {' '}
            <p className="text-red-400 font-bold">In Stock {stock}</p>
            <p className="text-red-400 font-bold">
              Get it out now for ${price}
            </p>
            <button
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
              className=" bg-red-400 hover:bg-red-700 border-red-400 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
            >
              Add To Basket
            </button>
            {authState.isAdmin && authState.token ? (
              <Link href={`/products/edit/${_id}`}>
                <a>
                  <button className=" bg-blue-400 hover:bg-blue-700 border-blue-400 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded">
                    Edit Product
                  </button>
                </a>
              </Link>
            ) : (
              ''
            )}
          </div>

          <table className="table-auto ">
            <thead></thead>
            <tbody>
              {specifications.map(({ name, description }, index) => (
                <tr key={name}>
                  <td className="bg-slate-100 border p-3">{name}</td>
                  <td className="bg-slate-100 border p-3">{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ReviewForm productId={_id} />
    </section>
  );
};

export default ProductPage;

export async function getServerSideProps(context: any) {
  const { productId } = context.query;
  console.log(productId);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${productId}`,
  );
  const {
    data: { product },
  } = await response.json();
  return {
    props: {
      ...product,
    },
  };
}
