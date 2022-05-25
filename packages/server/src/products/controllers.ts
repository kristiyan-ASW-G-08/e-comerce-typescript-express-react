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

export const postProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    console.log(req);
    // const tweet = new Product({
    //   text,
    //   user: userId,
    //   type,
    //   link: linkUrl,
    // });
    // res.status(201).json({ data: { tweetId: tweet._id } });
  } catch (err) {
    passErrorToNext(err, next);
  }
};
