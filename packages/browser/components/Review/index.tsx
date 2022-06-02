import Review from '@eco/common/source/types/Review';
import { FC } from 'react';
import ReviewStars from '../ReviewStars';

const ReviewComponent: FC<Review> = ({ rating, content, createdAt }) => (
  <article className="max-w-sm rounded overflow-hidden shadow-lg hover:scale-105 hover:bg-neutral-100 transition  ease-in-out delay-150 ">
    <div className="px-6 py-4">
      <p className="font-bold text-sm text-neutral-400 mb-2">{content}</p>
      <p>
        <ReviewStars rating={rating} />
      </p>
      <p className="font-bold text-sm text-neutral-400 mb-2">
        {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  </article>
);

export default ReviewComponent;
