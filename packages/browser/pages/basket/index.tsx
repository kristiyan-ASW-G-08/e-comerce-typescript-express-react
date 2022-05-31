import Product from '@eco/common/source/types/Product';
import { FC, useEffect } from 'react';
import { addProduct, removeProduct } from '../../slices/BasketSlice';
import { useDispatch, useSelector } from 'react-redux';
const Basket: FC = () => {
  const basket = useSelector((state: any) => state.basket);
  //   const dispatch = useDispatch();
  //   const cloudniaryImages = images
  //     .slice()
  //     .reverse()
  //     .map(image => {
  //       return cloudinary.image(image).setVersion('1650962083');
  //     });
  //   const imageComponents = cloudniaryImages.map(image => {
  //     return (
  //       <AdvancedImage
  //         className=" h-56 w-64 object-contain"
  //         cldImg={image}
  //         alt=""
  //       />
  //     );
  //   });
  return (
    <section>
      <div>
        <h1>Shopping Basket</h1>
      </div>
      <div>
        <button>Proceed to checkout</button>
      </div>
    </section>
  );
};

export default Basket;
