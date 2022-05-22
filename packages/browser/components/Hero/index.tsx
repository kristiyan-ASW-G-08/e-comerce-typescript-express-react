import { FC } from 'react';
import Carousel from '../Carousel';
import HeroCard from '../HeroCard';
import heroCard1Image from 'assets/galaxy-removebg-preview.png';
import heroCard2Image from 'assets/neon_orange_1_2-removebg-preview.png';
import heroCard3Image from 'assets/controller-removebg-preview.png';
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
  </section>
);

export default Hero;
