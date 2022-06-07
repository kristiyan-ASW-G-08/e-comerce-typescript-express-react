import express from 'express';
import multer from 'multer';
import fileFilter from '@customMiddleware/fileFilter';
import storage from '@customMiddleware/fileStorage';
import authenticationHandler from '@src/middleware/authenticationHandler';
import ProductValidator from '@eco/common/source/schemaValidators/ProductValidator';
import FilesValidator from '@eco/common/source/schemaValidators/FilesValidator';
import adminHandler from '@src/middleware/adminHandler';
import validationHandler from '@src/middleware/validationHandler';
import { getOrder, postOrder } from './controllers';
import OrderValidator from '@eco/common/source/schemaValidators/OrderValidator';
import paginationHandler from '@src/middleware/paginationHandler';

const multerStorage = multer({ storage, fileFilter }).array('files');

const router = express.Router();

router.post(
  '/orders',
  authenticationHandler,
  validationHandler([{ schema: OrderValidator, target: 'body' }]),
  postOrder,
);

router.get('/orders/:orderId', getOrder);

export default router;
