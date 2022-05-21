export interface SpecificationField {
  path: string;
  value: string;
}
export default interface Product {
  user: string;
  name: string;
  images: string[];
  specifications: SpecificationField[];
  brand: string;
  category:
    | 'Phones & Tablets'
    | 'Laptops & Computers'
    | 'TV'
    | 'Audio'
    | 'Peripherals';
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  inStock: number;
}
