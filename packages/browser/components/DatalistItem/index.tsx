import Product from '@eco/common/source/types/Product';
import Link from 'next/link';
import { FC, SyntheticEvent, useState } from 'react';
interface ProductProps {
  name: string;
  _id: string;
  category: string;
  resetSearch: () => void;
}
const Datalist: FC<ProductProps> = ({ name, _id, category, resetSearch }) => {
  return (
    <li className="p-2">
      <Link href={`/products/${_id}`}>
        <a onClick={resetSearch} className="flex w-full h-full space-x-14">
          <p>{name}</p> <p>In {category}</p>
        </a>
      </Link>
    </li>
  );
};
export default Datalist;
