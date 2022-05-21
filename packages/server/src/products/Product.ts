import mongoose, { Schema } from 'mongoose';
import ProductType from '@customTypes/ProductType';
import duplicationErrorHandler from '@customMiddleware/duplicationErrorHandler';
import uniqueValidator from 'mongoose-unique-validator';

const ProductSchema: Schema<ProductType> = new Schema<ProductType>(
  {
    email: { required: true, type: String, minlength: 3, unique: true },
    password: { required: true, type: String, minlength: 12 },
    isConfirmed: { required: true, type: Boolean, default: true },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true },
);

//@ts-ignore
ProductSchema.plugin(uniqueValidator);

// @ts-ignore
ProductSchema.post('save', duplicationErrorHandler);
// @ts-ignore
ProductSchema.post('update', duplicationErrorHandler);

export default mongoose.model<ProductType>('Product', ProductSchema);
