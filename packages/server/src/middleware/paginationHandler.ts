import { Request, Response, NextFunction } from 'express';

const paginationHandler = (
  req: Request,
  _: Response,
  next: NextFunction,
): void => {
  console.log(req.query);
  const category = req.query.category || 'Phones & tablets';
  const brand = req.query.brand || '';
  req.pagination = {
    //@ts-ignore
    limit: parseInt(req.query.limit, 10) || 25,
    //@ts-ignore
    category,
    //@ts-ignore
    brand,
    //@ts-ignore
    page: parseInt(req.query.page, 10) || 1,
    //@ts-ignore
    priceUpper: Number(req.query.priceUpper) || 10000,
    //@ts-ignore
    priceLower: Number(req.query.priceLower) || 1,
    //@ts-ignore
  };
  next();
};
export default paginationHandler;
