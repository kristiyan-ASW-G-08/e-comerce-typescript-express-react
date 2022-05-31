import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Hero from 'components/Hero';
import Footer from '@/components/Footer';
import Product from '@eco/common/source/types/Product';
import ProductCard from '@/components/ProductCard';
import FeaturedCategory from '@/components/FeaturedCategory';
import mobileAndTablets from 'assets/mobiles-tablets.jpg';
import computersAndLaptops from 'assets/computers-laptops.jpg';
import tvImage from 'assets/tv-video-audio.jpg';
import Link from 'next/link';
import Category from '@/components/Category';
const Home: NextPage<{
  phones: Product[];
  laptops: Product[];
  audio: Product[];
  tv: Product[];
  peripherals: Product[];
}> = ({ phones, laptops, audio, tv, peripherals }) => {
  console.log(laptops);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <div
        className={`${styles.categories} w-full flex p-10 px-24 border-b-4 flex-col space-y-8`}
      >
        <h1 className="w-full text-center font-bold text-2xl text-neutral-50">
          {' '}
          Featured Categories
        </h1>
        <div className="flex w-full flex-col items-center space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 justify-between">
          <FeaturedCategory
            content="Phones and Tablets"
            imageSrc={mobileAndTablets}
          />
          <FeaturedCategory
            content="Computers and Laptops"
            imageSrc={computersAndLaptops}
          />
          <FeaturedCategory content="TV's" imageSrc={tvImage} />
        </div>
      </div>
      <Category
        name="Laptops and Computers"
        products={laptops}
        href="/products/?category=Laptops and Computers"
      />
      <Category name="TV" products={tv} href="/products/?category=TV" />
      <Category
        name="Peripherals"
        products={peripherals}
        href="/products/?category=Peripherals"
      />
      <Category
        name="Phones and Tablets"
        products={phones}
        href="/products/?category=Phones and Tablets"
      />
      <Category
        name="Audio"
        products={audio}
        href="/products/?category=Audio"
      />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const phonesRequest = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/?category=Phones and Tablets&limit=5'
    `,
  );
  //@ts-ignore
  const phones = await phonesRequest.json();

  const audioRequest = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/?category=Audio&limit=5'
    `,
  );
  //@ts-ignore
  const audio = await audioRequest.json();

  const laptopsRequest = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/?category=Laptops and Computers&limit=5'
    `,
  );
  //@ts-ignore
  const laptops = await laptopsRequest.json();

  const tvRequest = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/?category=TV&limit=5'
    `,
  );
  const tv = await tvRequest.json();
  //@ts-ignore

  const peripheralsRequest = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/?category=Peripherals&limit=5'
    `,
  );

  const peripherals = await peripheralsRequest.json();
  //@ts-ignore

  return {
    props: {
      phones: phones.data.products,
      laptops: laptops.data.products,
      audio: audio.data.products,
      tv: tv.data.products,
      peripherals: peripherals.data.products,
    },
  };
}

export default Home;
