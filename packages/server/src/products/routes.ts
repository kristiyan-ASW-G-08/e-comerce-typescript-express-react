import express from 'express';
import multer from 'multer';
import fileFilter from '@customMiddleware/fileFilter';
import storage from '@customMiddleware/fileStorage';
import authenticationHandler from '@src/middleware/authenticationHandler';
import ProductValidator from '@eco/common/source/schemaValidators/ProductValidator';
import FilesValidator from '@eco/common/source/schemaValidators/FilesValidator';
import adminHandler from '@src/middleware/adminHandler';
import validationHandler from '@src/middleware/validationHandler';
import {
  getProduct,
  postProduct,
  getProducts,
  getProductsByName,
  editProduct,
  deleteProduct,
} from './controllers';
import SortStringValidator from '@eco/common/source/schemaValidators/SortStringValidator';
import paginationHandler from '@src/middleware/paginationHandler';

const multerStorage = multer({ storage, fileFilter }).array('files');

const router = express.Router();

router.post(
  '/products/:productId',
  authenticationHandler,
  adminHandler,
  multerStorage,
  validationHandler([{ schema: ProductValidator, target: 'body' }]),
  editProduct,
);

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

router.get('/products/:productId', getProduct);

router.get('/products/names/:name', getProductsByName);

router.get(
  '/products',
  validationHandler([{ schema: SortStringValidator, target: 'query' }]),
  paginationHandler,
  getProducts,
);

router.delete(
  '/products/:productId',
  authenticationHandler,
  adminHandler,
  deleteProduct,
);

export default router;
