import { FC } from 'react';
import Image from 'next/image';

interface FeaturedCategoryProps {
  content: string;
  imageSrc: any;
}

const FeaturedCategory: FC<FeaturedCategoryProps> = ({ content, imageSrc }) => {
  return (
    <div className="w-full lg:w-1/3 flex justify-center align-middle bg-neutral-50	flex-col rounded hover:scale-105 hover:bg-neutral-100 transition  ease-in-out delay-150 duration-400">
      <div className="h-32 w-full relative m-auto rounded">
        <Image className="rounded" layout="fill" alt="" src={imageSrc} />
      </div>
      <h3 className="text-center p-4">{content}</h3>
    </div>
  );
};

export default FeaturedCategory;
