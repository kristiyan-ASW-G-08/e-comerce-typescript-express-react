import { FC, useEffect, useState } from 'react';
import CarouselSlide from '../CarouselSlide';
import Image from 'next/image';
import image1 from 'assets/headphone-blue.png';
import image2 from 'assets/headphones-removebg-preview.png';
import image3 from 'assets/razer-lap-removebg-preview.png';
import image4 from 'assets/galaxy-removebg-preview.png';
const Carousel: FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  useEffect(() => {
    const slideTimer = setTimeout(() => {
      if (currentSlide === 2) {
        setCurrentSlide(0);
        return;
      }
      setCurrentSlide(prev => prev + 1);
    }, 5000);

    return () => {
      clearTimeout(slideTimer);
    };
  });
  const slides = [
    // <CarouselSlide
    //   heading="Browse Peripherals"
    //   content="Headphones,mice and keyboards"
    //   buttonText="Discover Now"
    //   currentSlide={currentSlide}
    //   setCurrentSlide={setCurrentSlide}
    //   imageSrc={image1}
    //   color={'blue'}
    //   href="products?category=Peripherals"
    // />,
    <CarouselSlide
      heading="Browse Peripherals"
      content="Headphones,mice and keyboards"
      buttonText="Discover Now"
      currentSlide={currentSlide}
      setCurrentSlide={setCurrentSlide}
      imageSrc={image2}
      color={'red'}
      href="products?category=Peripherals"
    />,
    <CarouselSlide
      heading="Browse Phones and Tablets"
      content="Wireless Connection With TV, Computer, Laptop..."
      buttonText="Discover Now"
      currentSlide={currentSlide}
      setCurrentSlide={setCurrentSlide}
      imageSrc={image4}
      color={'grey'}
      href="products?category=Phones%20and%Tablets"
    />,
    <CarouselSlide
      heading="Browse Laptops and Computers"
      content="Computers and Laptops"
      buttonText="Discover Now"
      currentSlide={currentSlide}
      setCurrentSlide={setCurrentSlide}
      imageSrc={image3}
      color={'green'}
      href="/products?category=Laptops%20and%20Computers"
    />,
  ];
  return (
    <div className="flex justify-center flow-col ">{slides[currentSlide]}</div>
  );
};

export default Carousel;
