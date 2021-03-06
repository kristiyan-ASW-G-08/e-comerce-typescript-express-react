import express, { Request, Response, NextFunction, Application } from 'express';

import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import userRoutes from '@users/routes';
import productRoutes from './products/routes';
import reviewRoutes from './reviews/routes';
import orderRoutes from './orders/routes';
import paypalRoutes from './paypal/routes';
import errorHandler from '@customMiddleware/errorHandler';
import populateDB from './utilities/populateDB';
const app: Application = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/images', express.static('./images'));

app.use(userRoutes);
app.use(productRoutes);
app.use(reviewRoutes);
app.use(orderRoutes);
app.use(paypalRoutes);
//@ts-ignore

app.use(errorHandler);

export default app;
