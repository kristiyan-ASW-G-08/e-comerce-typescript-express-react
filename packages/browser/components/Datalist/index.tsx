import Product from '@eco/common/source/types/Product';
import { FC, SyntheticEvent, useState } from 'react';
import DatalistItem from '../DatalistItem';
interface DatalistProps {
  products: Product[];
  resetSearch: () => void;
}
const Datalist: FC<DatalistProps> = ({ products, resetSearch }) => {
  return (
    <ul className="absolute translate-y-52 w-full bg-neutral-50 z-10">
      {products.map(product => (
        <DatalistItem
          key={product._id}
          {...product}
          resetSearch={resetSearch}
        />
      ))}
    </ul>
  );
};
export default Datalist;
