import { FC } from 'react';
import Carousel from '../Carousel';
import HeroCard from '../HeroCard';
import heroCard1Image from 'assets/galaxy-removebg-preview.png';
import heroCard2Image from 'assets/mikrofon-blue----yeti--blackout-30-removebg-preview.png';
import heroCard3Image from 'assets/controller-removebg-preview.png';
import Image from 'next/image';
import mobileAndTablets from 'assets/mobiles-tablets.jpg';
import computersAndLaptops from 'assets/computers-laptops.jpg';
import tv from 'assets/tv-video-audio.jpg';
import FeaturedCategory from '../FeaturedCategory';

const Hero: FC = () => (
  <section className={`bg-neutral-100 pt-5 flex flex-col`}>
    <Carousel />
    <div className="flex h-full sm:h-full lg:h-44 	w-full flex-col lg:flex-row  justify-between mt-3 mb-3">
      <HeroCard
        heading="Browse Our Promotions"
        imageSrc={heroCard1Image}
        cardNum={'card1'}
        content={'Wireless Connection With TV, Computer, Laptop..'}
        // href="/http://localhost:3000/products?category=Laptops%20and%20Computers&priceUpper=2000&priceLower=500&brand="
      />
      <HeroCard
        heading="Browse Audio"
        imageSrc={heroCard2Image}
        cardNum={'card1'}
        content={'Microphones'}
      />
      <HeroCard
        heading="Browse Gaming"
        imageSrc={heroCard3Image}
        cardNum={'card3'}
        content={'Controllers and Consoles'}
      />
    </div>
  </section>
);

export default Hero;
