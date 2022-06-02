import mongoose, { Schema } from 'mongoose';
import UserType from '@customTypes/UserType';
import duplicationErrorHandler from '@customMiddleware/duplicationErrorHandler';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema: Schema<UserType> = new Schema<UserType>(
  {
    email: { required: true, type: String, minlength: 3, unique: true },
    password: { required: true, type: String, minlength: 12 },
    isConfirmed: { required: true, type: Boolean, default: true },
    productReviews: [
      {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true },
);

//@ts-ignore
UserSchema.plugin(uniqueValidator);

// @ts-ignore
UserSchema.post('save', duplicationErrorHandler);
// @ts-ignore
UserSchema.post('update', duplicationErrorHandler);

export default mongoose.model<UserType>('User', UserSchema);
