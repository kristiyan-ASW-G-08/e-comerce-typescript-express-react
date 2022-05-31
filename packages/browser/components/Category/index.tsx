import Product from '@eco/common/source/types/Product';
import Link from 'next/link';
import { FC } from 'react';
import ProductCard from '../ProductCard';
interface CategoryProps {
  name: string;
  href: string;
  products: Product[];
}
const Category: FC<CategoryProps> = ({ href, name, products }) => (
  <div className="flex space-x-5 justify-center flex-col p-10 space-y-10 ">
    <h3 className="text-center text-2xl">{name}</h3>
    <div className="flex space-x-5 justify-center md:flex-row flex-col space-y-5">
      {products.map(product => (
        <ProductCard {...product} key={product._id} />
      ))}
    </div>
    <div className="flex w-full h-4 flex-row-reverse pr-36">
      <Link href={href}>
        <a className="text-blue-400 hover:text-red-400">Learn More</a>
      </Link>
    </div>
  </div>
);

export default Category;
