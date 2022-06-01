declare namespace Express {
  interface Request {
    userId: string;
    pagination: {
      limit: number;
      category:
        | 'Phones and Tablets'
        | 'Laptops and Computers'
        | 'TV'
        | 'Audio'
        | 'Peripherals';
      brand: string;
      priceUpper: number;
      priceLower: number;
      sortString: string;
      page: number;
      hasDeal: boolean;
    };
  }
}
