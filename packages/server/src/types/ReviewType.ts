import mongoose, { Document } from 'mongoose';
import CommonReview from '@eco/common/source/types/Review';

export default interface ReviewType extends CommonReview, Document {}
