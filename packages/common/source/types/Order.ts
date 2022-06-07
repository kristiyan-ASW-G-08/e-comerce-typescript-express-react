export default interface Order {
  user: string;
  address: {
    address: string;
    city: string;
    zip: string;
    country: string;
  };
  products: { quantity: number; productId: string };
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  productsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
  fullName: string;
  phoneNumber: string;
  _id: string;
}
