import { AdvancedImage } from '@cloudinary/react';
import cloudinary from 'cloudinary';
import { FC } from 'react';
import { BasketProduct } from 'slices/BasketSlice';
interface BasketProps {
  product: BasketProduct;
}
const Basket: FC<BasketProps> = ({ product }) => {
  const image = cloudinary.image(product.image).setVersion('1650962083');
  return (
    <article>
      <div>
        <AdvancedImage
          className=" h-24 w-24 object-contain"
          cldImg={image}
          alt=""
        />
      </div>
      <div>
        <h2>{}</h2>
      </div>
    </article>
  );
};
export default Basket;
