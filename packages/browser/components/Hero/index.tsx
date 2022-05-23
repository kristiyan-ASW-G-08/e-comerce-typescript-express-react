import { FC } from 'react';
import Carousel from '../Carousel';
import HeroCard from '../HeroCard';
import heroCard1Image from 'assets/galaxy-removebg-preview.png';
import heroCard2Image from 'assets/neon_orange_1_2-removebg-preview.png';
import heroCard3Image from 'assets/controller-removebg-preview.png';
import Image from 'next/image';
import mobileAndTablets from 'assets/mobiles-tablets.jpg';
import computersAndLaptops from 'assets/computers-laptops.jpg';
import tv from 'assets/tv-video-audio.jpg';
import FeaturedCategory from '../FeaturedCategory';
import styles from './index.module.css';
const Hero: FC = () => (
  <section className={`bg-neutral-100 pt-5 flex flex-col`}>
    <Carousel />
    <div className="flex h-full sm:h-full lg:h-44 	w-full flex-col lg:flex-row  justify-between mt-3 mb-3">
      <HeroCard
        heading="Browse Our Promotions"
        imageSrc={heroCard1Image}
        cardNum={'card1'}
        content={'Wireless Connection With TV, Computer, Laptop..'}
      />
      <HeroCard
        heading="Browse Our Promotions"
        imageSrc={heroCard2Image}
        cardNum={'card2'}
        content={'Wireless Connection With TV, Computer, Laptop..'}
      />
      <HeroCard
        heading="Browse Our Promotions"
        imageSrc={heroCard3Image}
        cardNum={'card3'}
        content={'Wireless Connection With TV, Computer, Laptop..'}
      />
    </div>

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
        <FeaturedCategory content="TV's" imageSrc={tv} />
      </div>
    </div>
  </section>
);

export default Hero;
