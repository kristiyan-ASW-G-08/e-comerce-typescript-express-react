import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

interface ReviewStarsProps {
  rating: number;
}

const ReviewStars: FC<ReviewStarsProps> = ({ rating }) => (
  <>
    {Array.from(Array(Math.round(rating)).keys()).map(() => (
      <FontAwesomeIcon className="text-yellow-400" icon={faStar} />
    ))}
    {Array.from(Array(Math.round(5 - rating)).keys()).map(() => (
      <FontAwesomeIcon icon={faStar} />
    ))}
  </>
);

export default ReviewStars;
