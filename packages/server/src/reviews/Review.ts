import mongoose, { Schema } from 'mongoose';
import ReviewType from '@customTypes/ReviewType';

const ReviewSchema: Schema<ReviewType> = new Schema<ReviewType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: { required: true, type: Number, default: 1 },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ReviewType>('Review', ReviewSchema);
