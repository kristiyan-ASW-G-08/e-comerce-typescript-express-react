import mongoose, { Document } from 'mongoose';
import CommonProduct from '@eco/common/source/types/Product';

export default interface ProductType extends CommonProduct, Document {}
