import { FC } from 'react';
import Image from 'next/image';
import styles from './index.module.css';
interface HeroCardProps {
  cardNum: string;
  content: string;
  heading: string;
  imageSrc: any;
}
const HeroCard: FC<HeroCardProps> = ({
  cardNum,
  imageSrc,
  content,
  heading,
}) => (
  <div
    className={`${styles[cardNum]} animate-fade h-44 mb-4 rounded flex flex-row mx-4 sm:mx-4 w-full lg:w-1/3 p-3`}
  >
    <div className=" flex flex-col m-auto">
      <h1 className="text-2xl  text-neutral-50">{heading}</h1>
      <p className="text-base  text-neutral-50">{content}</p>
    </div>
    <div className="h-40 w-40 relative m-auto">
      <Image layout="fill" alt="" src={imageSrc} />
    </div>
  </div>
);

export default HeroCard;
