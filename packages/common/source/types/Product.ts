export interface SpecificationField {
  name: string;
  description: string;
}
export type category =
  | 'Phones and Tablets'
  | 'Laptops and Computers'
  | 'TV'
  | 'Audio'
  | 'Peripherals';
export default interface Product {
  user: string;
  name: string;
  images: string[];
  specifications: SpecificationField[];
  brand: string;
  category: category;
  hasDeal: boolean;
  dealPrice: number;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  stock: number;
  _id: string;
}
