import React, { FC } from 'react';
import Order from '@eco/common/source/types/Order';
import cloudinary from '../../../cloudinary';
import { AdvancedImage } from '@cloudinary/react';
import sumProductPrices from '@/utilities/sumProductPrices';
const Order: FC<Order> = ({
  shippingPrice,
  products,
  totalPrice,
  fullName,
  phoneNumber,
  address: { address, city, zip, country },
  _id,
}) => {
  console.log(products);
  return (
    <main className="p-10">
      <section className="p-5">
        <h1 className="text-3xl font-bold">
          Order Confirmation: <span className="text-green-400">Success</span>
        </h1>
        <p className="text-md font-bold text-neutral-500">Order Id: {_id}</p>
      </section>
      <section className="p-5">
        <h2 className="text-xl font-bold ">Your order will arrive at:</h2>
        <p className="text-md font-bold text-neutral-500">Address: {address}</p>
        <p className="text-md font-bold text-neutral-500">City: {city}</p>
        <p className="text-md font-bold text-neutral-500">ZIP: {zip}</p>
      </section>
      <section className="p-5 border-b-2 border-neutral-400">
        <h2 className="text-xl font-bold ">Products</h2>
        {/*
 // @ts-ignore */}
        {products.map(
          //@ts-ignore
          ({ product: { images, name, price }, quantity }) => {
            const cloudinaryImage = cloudinary
              .image(images[images.length - 1])
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
          },
        )}
      </section>
      <h2 className="text-xl font-bold ">
        {/*
 // @ts-ignore */}
        Total : {totalPrice}
      </h2>
    </main>
  );
};
export async function getServerSideProps(context: any) {
  const { orderId } = context.query;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${orderId}`,
  );
  const {
    data: { order, products },
  } = await response.json();
  console.log(order._id);
  return {
    props: {
      ...order,
      products,
    },
  };
}

export default Order;
