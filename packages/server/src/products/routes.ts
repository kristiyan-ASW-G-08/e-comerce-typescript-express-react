import express from 'express';
import multer from 'multer';
import fileFilter from '@customMiddleware/fileFilter';
import storage from '@customMiddleware/fileStorage';
import authenticationHandler from '@src/middleware/authenticationHandler';
import ProductValidator from '@eco/common/source/schemaValidators/ProductValidator';
import FilesValidator from '@eco/common/source/schemaValidators/FilesValidator';
import adminHandler from '@src/middleware/adminHandler';
import validationHandler from '@src/middleware/validationHandler';
import { getProduct, postProduct } from './controllers';

const multerStorage = multer({ storage, fileFilter }).array('files');

const router = express.Router();

router.post(
  '/products',
  authenticationHandler,
  adminHandler,
  multerStorage,
  validationHandler([
    { schema: ProductValidator, target: 'body' },
    { schema: FilesValidator, target: 'req' },
  ]),
  postProduct,
);

router.get('/product/:productId', getProduct);
export default router;
