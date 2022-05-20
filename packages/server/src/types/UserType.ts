import mongoose, { Document } from 'mongoose';
import CommonUser from '@eco/common/source/types/User';

export default interface UserType extends CommonUser, Document {
  password: string;
  isConfirmed: boolean;
}
