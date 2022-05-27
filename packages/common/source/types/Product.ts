export interface SpecificationField {
  name: string;
  description: string;
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
  stock: number;
  _id:string;
}
