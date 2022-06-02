import Product from '@eco/common/source/types/Product';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import cloudinary from '../../../cloudinary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faDotCircle,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import ReviewForm from '@/components/ReviewForm';
import { addProduct } from '../../../slices/BasketSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReviewStars from '@/components/ReviewStars';
import Review from '@eco/common/source/types/Review';
import ReviewItem from '@/components/Review';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
interface Reviews {
  reviews: Review[];
}
interface ProductPageProps extends Reviews, Product {}
const ProductPage: FC<ProductPageProps> = ({
  name,
  images,
  specifications,
  description,
  stock,
  price,
  category,
  _id,
  numReviews,
  rating,
  reviews,
}) => {
  const dispatch = useDispatch();
  const { replace } = useRouter();
  const authState = useSelector((state: any) => state.auth);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [currentReviews, setCurrentReviews] = useState<Review[]>(reviews);
  const setReview = (review: Review) => {
    setCurrentReviews([review, ...currentReviews]);
  };

  const setReviews = (value: string) => {
    if (value === 'all') {
      setCurrentReviews(reviews);
    } else {
      const parsedValue = parseInt(value);
      const filteredReviews = reviews.filter(
        ({ rating }) => rating === parsedValue,
      );

      setCurrentReviews(filteredReviews);
    }
  };
  // useEffect(() => {
  //   setCurrentReviews(reviews);
  // }, [reviews]);
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
    <section key={_id}>
      <div className="h-auto w-full md:flex md:flex-row md:p-10 md:space-x-28">
        <div>
          <div className="flex justify-center items-center md:flex-row space-y-5 space-x-8 p-5 flex-col w-full md:w-3/6">
            <div className="hidden md:flex flex-col space-y-3">
              {cloudniaryImages.map((image, index) => {
                return (
                  <button
                    className="h-24 w-24 "
                    onClick={() => setCurrentImage(index)}
                  >
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
        <div className="w-4/6 flex flex-col space-y-5 pl-10">
          <h1 className="font-bold">{name}</h1>
          <Link href={`/products?category=${category}`}>
            <a className="text-yellow-400 font-bold hover:text-red-400">
              {category}
            </a>
          </Link>
          <p>
            <ReviewStars rating={rating} />({numReviews})
          </p>
          <p>{description}</p>
          <div className="flex flex-col space-y-10 md:space-x-10 md:flex-row">
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
              <>
                <Link href={`/products/edit/${_id}`}>
                  <a>
                    <button className=" bg-blue-400 hover:bg-blue-700 border-blue-400 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded">
                      Edit Product
                    </button>
                  </a>
                </Link>
                <button
                  className=" bg-red-400 hover:bg-red-700 border-red-400 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="button"
                  onClick={async () => {
                    await fetch(
                      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${_id}`,
                      {
                        method: 'DELETE',
                        headers: {
                          Authorization: `Bearer ${authState.token}`,
                        },
                      },
                    );
                    replace('/');
                  }}
                >
                  Delete
                </button>
              </>
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
      <ReviewForm setReview={setReview} productId={_id} />
      <div className="flex items-center flex-col space-y-10 p-3">
        <p className="text-2xl">Reviews</p>
        <div className="space-y-6">
          <div>
            <select
              onChange={(e: SyntheticEvent) => {
                e.target as HTMLInputElement;
                setReviews((e.target as HTMLInputElement).value);
              }}
              className="
              p-3
      block
      w-full
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-red0-400 focus:outline-none"
              name="rating"
            >
              <option value="all" selected>
                All Reviews
              </option>
              <option value="1">Select reviews with rating 1</option>
              <option value="2">Select reviews with rating 2</option>
              <option value="3">Select reviews with rating 3</option>
              <option value="4">Select reviews with rating 4</option>
              <option value="5">Select reviews with rating 5</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {currentReviews.map(review => (
              <ReviewItem key={review._id} {...review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;

export async function getServerSideProps(context: any) {
  const { productId } = context.query;
  const responses = await Promise.all([
    await (
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${productId}`)
    ).json(),
    await (
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${productId}/reviews?limit=1000`,
      )
    ).json(),
  ]);
  return {
    props: {
      ...responses[0].data.product,
      reviews: responses[1].data.reviews,
    },
  };
}
