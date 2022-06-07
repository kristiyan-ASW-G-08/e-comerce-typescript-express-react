import mongoose, { Document } from 'mongoose';
import CommonOrder from '@eco/common/source/types/Order';

export default interface OrderType extends CommonOrder, Document {}
