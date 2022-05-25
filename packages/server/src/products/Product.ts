import mongoose, { Schema } from 'mongoose';
import ProductType from '@customTypes/ProductType';

const ProductSchema: Schema<ProductType> = new Schema<ProductType>(
  {
    name: { required: true, type: String },
    description: { required: true, type: String },
    category: { required: true, type: String },
    price: { required: true, type: Number },
    stock: { required: true, type: Number, default: 0 },
    images: [
      {
        type: String,
      },
    ],
    specifications: [
      {
        name: { required: true, type: String },
        description: { required: true, type: String },
      },
    ],
    numReviews: { required: true, type: Number, default: 0 },
    rating: { required: true, type: Number, default: 0 },
  },
  { timestamps: true },
);

//@ts-ignore

export default mongoose.model<ProductType>('Product', ProductSchema);
