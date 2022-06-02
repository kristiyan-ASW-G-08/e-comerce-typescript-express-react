type rating = 1 | 2 | 3 | 4 | 5;
export default interface Review {
  rating: rating;
  content: string;
  user: string;
  product: string;
  _id: string;
  createdAt: string;
}
