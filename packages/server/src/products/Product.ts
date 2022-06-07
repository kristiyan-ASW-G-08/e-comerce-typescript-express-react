import mongoose, { Schema } from 'mongoose';
import ProductType from '@customTypes/ProductType';

const SpecificationSchema = new Schema({
  name: { required: true, type: String },
  description: { required: true, type: String },
});
const ProductSchema: Schema<ProductType> = new Schema<ProductType>(
  {
    name: { required: true, type: String },
    description: { required: true, type: String },
    category: { required: true, type: String },
    brand: { required: true, type: String },
    price: { required: true, type: Number },
    stock: { required: true, type: Number, default: 0 },
    hasDeal: { required: false, type: Boolean, default: false },
    dealPrice: { required: false, type: Number, default: 0 },
    images: [
      {
        type: String,
      },
    ],
    specifications: { type: [SpecificationSchema], default: [] },
    numReviews: { required: true, type: Number, default: 0 },
    rating: { required: true, type: Number, default: 0 },
  },
  { timestamps: true },
);

ProductSchema.index({ name: 'text' });

export default mongoose.model<ProductType>(
  'Product',
  ProductSchema,
);
