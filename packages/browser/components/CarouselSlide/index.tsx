import { Dispatch, FC, SetStateAction } from 'react';
import Image from 'next/image';
import image1 from 'assets/headphone-blue.png';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface CarouselSlideProps {
  heading: string;
  content: string;
  buttonText: string;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
  currentSlide: number;
  imageSrc: any;
  color: 'green' | 'red' | 'blue' | 'grey';
  href: string;
}
const CarouselSlide: FC<CarouselSlideProps> = ({
  heading,
  content,
  buttonText,
  setCurrentSlide,
  currentSlide,
  imageSrc,
  color,
  href,
}) => {
  const hoverClasses = {
    red: 'hover:bg-red-700',
    green: 'hover:bg-green-700',
    blue: 'hover:bg-blue-700',
  };
  return (
    <div
      key={color}
      className={`${styles[color]} animate-slide mx-5 h-60 md:h-96	w-full rounded-lg flex flex-col  justify-center  `}
    >
      <div className="flex justify-center">
        <div className="m-auto p-5">
          <h1 className="pb-3 font-bold text-2xl md:text-5xl text-neutral-50">
            {heading}
          </h1>
          <p className="pb-10 font-bold md:text-lg text-neutral-50">
            {content}
          </p>
          <Link href={href}>
            <a>
              <button
                className={`text-sm rounded-full border-2 py-2 px-7 text-neutral-50 font-bold ${hoverClasses[color]}`}
              >
                {buttonText}
              </button>
            </a>
          </Link>
        </div>
        <div className="md:h-72 md:w-72 h-48 w-48 relative m-auto">
          {' '}
          {imageSrc ? (
            <Image src={imageSrc} layout="fill" alt="" className="h-40" />
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <button
          data-testid="button-0"
          onClick={() => setCurrentSlide(0)}
          className="px-3 text-neutral-50"
        >
          {' '}
          {currentSlide === 0 ? (
            <FontAwesomeIcon height={12} icon={faCircle} />
          ) : (
            <FontAwesomeIcon height={12} icon={faDotCircle} />
          )}
        </button>

        <button
          data-testid="button-1"
          onClick={() => setCurrentSlide(1)}
          className="px-3 text-neutral-50"
        >
          {' '}
          {currentSlide === 1 ? (
            <FontAwesomeIcon height={12} icon={faCircle} />
          ) : (
            <FontAwesomeIcon height={12} icon={faDotCircle} />
          )}
        </button>

        <button
          data-testid="button-2"
          onClick={() => setCurrentSlide(2)}
          className="px-3 text-neutral-50"
        >
          {' '}
          {currentSlide === 2 ? (
            <FontAwesomeIcon height={12} icon={faCircle} />
          ) : (
            <FontAwesomeIcon height={12} icon={faDotCircle} />
          )}
        </button>
      </div>
    </div>
  );
};

export default CarouselSlide;
