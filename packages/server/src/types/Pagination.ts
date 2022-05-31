export default interface Pagination {
  limit: number;
  category:
    | 'Phones and Tablets'
    | 'Laptops and Computers'
    | 'TV'
    | 'Audio'
    | 'Peripherals';
  priceUpper: number;
  priceLower: number;
  sortString: string;
  page: number;
}
