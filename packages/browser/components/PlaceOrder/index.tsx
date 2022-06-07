import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BasketProduct } from 'slices/BasketSlice';
import { Checkout } from 'slices/CheckoutSlice';
import { PaymentMethod } from 'slices/PaymentMethodSlice';
import cloudinary from '../../cloudinary';
import { AdvancedImage } from '@cloudinary/react';
import sumProductPrices from '@/utilities/sumProductPrices';
import { PayPalButton } from 'react-paypal-button-v2';
import { AuthState } from 'slices/AuthSlice';
import Router, { useRouter } from 'next/router';
import { resetBasket } from 'slices/BasketSlice';

const PlaceOrder = () => {
  const [PAYPAL_CLIENT_ID, setClientId] = useState<string>('');
  const { push } = useRouter();
  const { address, phoneNumber, zip, city, fullName, country } = useSelector(
    (state: { checkout: Checkout }) => state.checkout,
  );
  const basket = useSelector(
    (state: { basket: BasketProduct[] }) => state.basket,
  );
  const payment = useSelector(
    (state: { payment: PaymentMethod }) => state.payment,
  );
  const auth = useSelector((state: { auth: AuthState }) => state.auth);

  const price = sumProductPrices(basket);
  const shipping = price > 50 ? 0 : 100;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState<boolean>(false);
  useEffect(() => {
    const addPayPalScript = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/paypal`,
      );
      const { data } = await response.json();
      const script = document.createElement('script');
      script.type = 'text/javascript';
      setClientId(data.PAYPAL_CLIENT_ID);
      script.src = `https://wwww.paypal.com/sdk/js?client-id=${data.PAYPAL_CLIENT_ID}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!window.paypal) {
      addPayPalScript();
    }
  });
  return (
    <section className="space-y-5 flex flex-col md:flex-row">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold">Place Order</h1>
        <div className="space-y-2 py-2 border-b-2 border-neutral-400">
          <h2 className="text-xl font-bold ">Payment Method</h2>
          <p className="text-md font-bold text-neutral-500">{payment.method}</p>
        </div>
        <div className="space-y-2 py-2 border-b-2 border-neutral-400">
          <h2 className="text-xl font-bold ">Shipping Information</h2>
          <p className="text-md font-bold text-neutral-500">
            Full Name: {fullName}
          </p>
          <p className="text-md font-bold text-neutral-500">
            Phone Number: {phoneNumber}
          </p>
          <p className="text-md font-bold text-neutral-500">
            Address: {address}
          </p>
          <p className="text-md font-bold text-neutral-500">City: {city}</p>
          <p className="text-md font-bold text-neutral-500">ZIP: {zip}</p>
        </div>
        <div className="space-y-5 py-2 border-b-2 border-neutral-400">
          <h2 className="text-xl font-bold ">Products</h2>
          {basket.map(({ image, name, price, quantity }) => {
            const cloudinaryImage = cloudinary
              .image(image)
              .setVersion('1650962083');

            return (
              <article className="flex space-x-20 py-2 ">
                <AdvancedImage
                  className=" h-12 w-12 object-contain"
                  cldImg={cloudinaryImage}
                  alt=""
                />
                <p>{name}</p>
                <p>
                  ${price} X {quantity} = ${price * quantity}
                </p>
              </article>
            );
          })}
        </div>
      </div>
      <div className="md:w-2/4 lg:w-1/4">
        <div className="border rounded p-10 mx-4  space-y-5 w-full flex flex-col">
          <h1 className="text-xl font-bold">Order Summary</h1>
          <p className="text-md font-bold text-neutral-500 border-b-2 border-neutral-400">
            Products: ${price}
          </p>
          <p className="text-md font-bold text-neutral-500 border-b-2 border-neutral-400">
            Shipping: {price > 50 ? 'Free' : `$${100}`}
          </p>
          <p className="text-md font-bold text-neutral-500 border-b-2 border-neutral-400">
            Total: ${price + shipping}
          </p>
          {PAYPAL_CLIENT_ID ? (
            <PayPalButton
              amount={price + shipping}
              options={{
                currency: 'usd'.toUpperCase(),
                clientId: PAYPAL_CLIENT_ID,
              }}
              onSuccess={async (details: any, data: any) => {
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_SERVER_URL}/orders`,
                  {
                    method: 'post',
                    headers: {
                      'content-type': 'application/json',
                      Authorization: `Bearer ${auth.token}`,
                    },
                    body: JSON.stringify({
                      products: basket.map(({ _id, quantity }) => ({
                        productId: _id,
                        quantity,
                      })),
                      fullName,
                      phoneNumber,
                      paypalDetails: details,
                      address: {
                        address: address,
                        city: city,
                        zip: zip,
                        country: country,
                      },
                      paymentMethod: payment.method,
                      shippingPrice: shipping,
                      productsPrice: price,
                      totalPrice: shipping + price,
                    }),
                  },
                );
                const {
                  data: { order },
                } = await response.json();
                dispatch(resetBasket());
                push(`/orders/${order._id}`);
              }}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
