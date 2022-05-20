import mongoose, { Schema } from 'mongoose';
import UserType from '@customTypes/UserType';
import duplicationErrorHandler from '@customMiddleware/duplicationErrorHandler';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema: Schema<UserType> = new Schema<UserType>({
  email: { required: true, type: String, minlength: 3, unique: true },
  password: { required: true, type: String, minlength: 12 },
  isConfirmed: { type: Boolean, default: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

//@ts-ignore
UserSchema.plugin(uniqueValidator);

export default mongoose.model<UserType>('User', UserSchema);
