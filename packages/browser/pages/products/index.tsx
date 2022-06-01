import Product from '@eco/common/source/types/Product';
import { FC, useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import PriceForm from '@/components/PriceForm';
import BrandForm from '@/components/BrandForm';
import { useRouter } from 'next/router';
import brands from '@/utilities/brands';
import Link from 'next/link';
const ProductsPage: FC<{
  products: Product[];
  links: { prev: number; next: number };
}> = ({ products, links }) => {
  console.log(products);
  const { query, push } = useRouter();
  const priceRanges = ['500-750', '750-1000', '1000-1500', '1500-2000'];
  const [currentPriceString, setCurrentPriceString] =
    useState<string>('100-10000');
  const [hasDeal, setHasDeal] = useState<boolean>(false);
  const [currentBrand, setCurrentBrand] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<string | undefined | string[]>(
    query.page,
  );
  const [nextPage, setNextPage] = useState<string | undefined | string[]>(
    query.nextPage,
  );
  const setPrice = (priceString: string) => {
    setCurrentPriceString(priceString);
    const prices = priceString.split('-');
    push(
      `/products?category=${query.category}&priceUpper=${parseInt(
        prices[1],
      )}&priceLower=${parseInt(prices[0])}&brand=${currentBrand}`,
    );
  };
  const setBrand = (brand: string) => {
    setCurrentBrand(brand);
    const prices = currentPriceString.split('-');
    push(
      `/products?category=${query.category}&priceUpper=${parseInt(
        prices[1],
      )}&priceLower=${parseInt(prices[0])}&brand=${brand}`,
    );
  };

  const setHasDealCheck = () => {
    setHasDeal(prev => !prev);
    const prices = currentPriceString.split('-');
    push(
      `/products?category=${query.category}&priceUpper=${parseInt(
        prices[1],
      )}&priceLower=${parseInt(
        prices[0],
      )}&hasDeal=${!hasDeal}&brand=${currentBrand}`,
    );
  };
  return (
    <section>
      <h1 className="ml-32 mt-14 font-bold text-3xl">{query.category}</h1>
      <div className="flex-col md:flex-row flex px-32 py-10 space-x-12">
        <div className="space-y-5">
          <PriceForm priceRanges={priceRanges} setPrice={setPrice} />
          {/*
 // @ts-ignore */}
          <BrandForm brands={brands[query.category]} setBrand={setBrand} />
          <button
            onClick={setHasDealCheck}
            className="p-2 px-10 bg-blue-400 text-neutral-50 text-1xl"
          >
            Deals
          </button>
          <button></button>
        </div>
        <div className="grid md:grid-cols-2 auto-rows-min lg:grid-cols-4 gap-10">
          {products.map(product => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </div>
      <div className="w-full  p-5 flex justify-center space-x-5">
        {links.prev ? (
          <Link
            href={`/products?category=${query.category}&priceUpper=${parseInt(
              currentPriceString.split('-')[1],
            )}&priceLower=${parseInt(
              currentPriceString.split('-')[0],
              //@ts-ignore
            )}&brand=${currentBrand}&page=${
              //@ts-ignore
              query.page ? parseInt(query.page, 10) - 1 : 1
            }`}
          >
            <a className="text-blue-400">Previous Page</a>
          </Link>
        ) : (
          ''
        )}
        {links.next ? (
          <Link
            href={`/products?category=${query.category}&priceUpper=${
              currentPriceString.split('-')[1]
            }&priceLower=${
              currentPriceString.split('-')[0]
              //@ts-ignore
            }&brand=${currentBrand}&page=${
              //@ts-ignore
              query.page ? parseInt(query.page, 10) + 1 : 1
            }`}
          >
            <a className="text-blue-400">Next Page</a>
          </Link>
        ) : (
          ''
        )}
      </div>
    </section>
  );
};

export default ProductsPage;

export async function getServerSideProps(context: any) {
  const { category, priceUpper, priceLower, brand, page, hasDeal } =
    context.query;
  console.log(priceUpper, priceLower, page);
  console.log(priceUpper, priceLower, brand);
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_SERVER_URL
    }/products/?limit=20&category=${category}${
      priceUpper ? `&priceUpper=${priceUpper}` : ''
    }
    ${priceLower ? `&priceLower=${priceLower}` : ''}
    ${page ? `&page=${page}` : ''}
    ${brand ? `&brand=${brand}` : ''}
    ${hasDeal ? `&hasDeal=${hasDeal}` : ''}

    `,
  );
  const {
    data: { links, products },
  } = await response.json();

  console.log();
  return {
    props: {
      links,
      products,
    },
  };
}
