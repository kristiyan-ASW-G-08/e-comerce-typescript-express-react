import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import passErrorToNext from '@utilities/passErrorToNext';
import isAuthorized from '@utilities/isAuthorized';
import deleteFile from '@utilities/deleteFile';
import includesId from '@src/utilities/includesId';
import removeId from '@utilities/removeId';
import { getUserById } from 'src/users/services';
import findDocs from '@utilities/findDocs';
import getPaginationURLs from '@utilities/getPaginationURLs';
import uploadToCloudinary from '@src/utilities/uploadToCloudinary';
import deleteCloudinaryFile from '@src/utilities/deleteFromCloudinary';
import Product from './Product';
import getProductById from './services';
import ProductType from '@src/types/ProductType';

export const postProduct = async (
  {
    files,
    body: { name, brand, price, stock, description, category, specifications },
  }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let images: string[] = [];
    //@ts-ignore
    for (const file of files) {
      const { path, filename } = file;
      images = [
        ...images,
        (await uploadToCloudinary(path, filename)).public_id,
      ];
      deleteFile(path);
    }
    const product = await new Product({
      name,
      brand,
      price,
      stock,
      description,
      category,
      specifications: JSON.parse(specifications),
      images,
    }).save();
    res.status(201).json({ data: { productId: product._id } });
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const editProduct = async (
  {
    files,
    body: { name, brand, price, stock, description, category, specifications },
    params: { productId },
  }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let images: string[] = [];
    //@ts-ignore
    if (files) {
      //@ts-ignore
      for (const file of files) {
        const { path, filename } = file;
        images = [
          ...images,
          (await uploadToCloudinary(path, filename)).public_id,
        ];
        deleteFile(path);
      }
    }

    const product = await getProductById(productId);
    product.name = name;
    product.brand = brand;
    product.price = price;
    product.stock = stock;
    product.description = description;
    product.category = category;
    product.specifications = JSON.parse(specifications);
    if (images.length > 3) {
      for (const image of product.images) {
        await deleteCloudinaryFile(image);
      }
      product.images = images;
    }
    await product.save();
    res.status(201).json({ data: { productId: product._id } });
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const getProduct = async (
  { params: { productId } }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res
      .status(200)
      .json({ data: { product: await getProductById(productId) } });
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const getProducts = async (
  { pagination }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      page,
      limit,
      category,
      priceLower,
      priceUpper,
      brand,
      hasDeal,
    } = pagination;
    let query = { category, price: { $gte: priceLower, $lte: priceUpper } };
    if (brand !== '') {
      //@ts-ignore
      query.brand = brand;
    }
    if (hasDeal === true) {
      //@ts-ignore
      query.hasDeal = hasDeal;
    }

    console.log(query);
    const { documents, count } = await findDocs<ProductType>({
      model: Product,
      //@ts-ignore
      pagination,
      //@ts-ignore
      query,
    });
    const { prevPage, nextPage } = getPaginationURLs({
      page,
      urlExtension: 'products',
      count,
      queries: {
        limit,
        category,
      },
    });
    res.status(200).json({
      data: {
        products: documents,
        links: {
          next: nextPage,
          prev: prevPage,
        },
      },
    });
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const getProductsByName = async (
  { params: { name } }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const searchRegex = new RegExp(name, 'gi');
    const products = await Product.find(
      {
        name: { $regex: searchRegex },
      },
      'name images brand price category',
    )
      .select([
        { $match: { $text: { $search: 'Pattern' } } },
        { score: { $meta: 'textScore' } },
      ])
      .limit(10)
      .exec();
    res.status(200).json({ data: { products } });
  } catch (err) {
    passErrorToNext(err, next);
  }
};
