import mongoose from 'mongoose';
import Tweet from '@products/Product';
import { getUserByEmail } from '@users/services';
import Product from '@products/Product';

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const populateDB = async () => {
  const images = [
    'commerce/2022-05-26T08-49-48.555Z-41A9Ala2xAS',
    'commerce/2022-05-26T08-49-48.556Z-51AwZ-AJMbS',
    'commerce/2022-05-26T08-49-48.556Z-61+Rueuij0S',
    'commerce/2022-05-26T08-49-48.557Z-61oA7CYJ7NL',
    'commerce/2022-05-26T08-49-48.561Z-71QUoALdoAL',
  ];
  const specifications = [
    { name: 'Cellular Technology', description: '4G	' },
    { name: 'Screen Size', description: '6.6 inches	' },
    { name: 'Item Dimensions', description: '	7.64 x 0.88 x 16.51 cm' },
    { name: 'Cellular Technology', description: '4G	' },
    { name: 'Screen Size', description: '6.6 inches	' },
    { name: 'Item Dimensions', description: '	7.64 x 0.88 x 16.51 cm' },
    { name: 'Cellular Technology', description: '4G	' },
    { name: 'Screen Size', description: '6.6 inches	' },
    { name: 'Item Dimensions', description: '	7.64 x 0.88 x 16.51 cm' },
    { name: 'Cellular Technology', description: '4G	' },
    { name: 'Screen Size', description: '6.6 inches	' },
    { name: 'Item Dimensions', description: '	7.64 x 0.88 x 16.51 cm' },
    { name: 'Cellular Technology', description: '4G	' },
    { name: 'Screen Size', description: '6.6 inches	' },
    { name: 'Item Dimensions', description: '	7.64 x 0.88 x 16.51 cm' },
    { name: 'Cellular Technology', description: '4G	' },
    { name: 'Screen Size', description: '6.6 inches	' },
    { name: 'Item Dimensions', description: '	7.64 x 0.88 x 16.51 cm' },
  ];
  const names = ['Samsung Galaxy A13', 'Apple iPhone 13', 'Nokia G21'];
  const description =
    "Vivid display – More room to play with the 6.6-inch Infinity-V Display, FHD+ technology makes your everyday content look sharp, crisp, and clear.  Minimalist Design – Combining soft colors with a look and feel that's gentle to the touch and comfortable to hold.Quad Camera System – Capture memorable moments in crisp clear detail with the 50MP Main camera, Expand your viewing angle with the ultra-wide camera, optimise the focus with the Depth camera, and enhance your shots with the macro camera.";

  const priceArray = [150, 250, 500, 750, 1000, 1500, 2000];
  const categories = [
    'Phones and Tablets',
    'Laptops and Computers',
    'TV',
    'Audio',
    'Peripherals',
  ];
  const brands = [
    'Samsung',
    'Apple',
    'Huawei',
    'Nokia',
    'Sony',
    'LG',
    'HTC',
    'Motorola',
  ];
  const numbers = Array.from(Array(1000).keys());

  for await (const number of numbers) {
    const priceNumber = randomIntFromInterval(0, 6);
    const categoryNumber = randomIntFromInterval(0, 4);
    const namesNumber = randomIntFromInterval(0, 2);
    const brandsNum = randomIntFromInterval(0, 7);
    const price = priceArray[priceNumber];
    const brand = brands[brandsNum];
    const category = categories[categoryNumber];
    const name = names[namesNumber];
    await new Product({
      name,
      brand,
      price,
      stock: 1000,
      description,
      category,
      specifications,
      images,
    }).save();
  }
};
export default populateDB;
