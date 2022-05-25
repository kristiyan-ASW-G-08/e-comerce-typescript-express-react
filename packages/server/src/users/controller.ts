import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getUserByEmail, getUserById } from '@users/services';

import passErrorToNext from '@utilities/passErrorToNext';
import includesId from '@src/utilities/includesId';
import removeId from '@utilities/removeId';
import MailOptions from '@customTypes/MailOptions';
import User from '@users/User';
import RESTError, { errors } from '@utilities/RESTError';
import sendEmail from '@utilities/sendEmail';
import findDocs from '@utilities/findDocs';
import hasConfirmedEmail from '@utilities/hasConfirmedEmail';
import getPaginationURLs from '@utilities/getPaginationURLs';
import UserType from '@src/types/UserType';
import uploadToCloudinary from '@src/utilities/uploadToCloudinary';
import deleteCloudinaryFile from '@src/utilities/deleteFromCloudinary';
import deleteFile from '@src/utilities/deleteFile';
import ValidationError from '@eco/common/source/types/ValidationError';
import duplicationErrorHandler from '@src/middleware/duplicationErrorHandler';

export const signUp = async (
  { body: { email, password } }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    console.log(email, password);

    await new User({
      email,
      password: await bcrypt.hash(password, 12),
      // eslint-disable-next-line consistent-return
    }).save();

    res.sendStatus(201);
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const logIn = async (
  { body: { email, password } }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { SECRET } = process.env;
    const user = await getUserByEmail(email);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      const { status } = errors.Unauthorized;
      res.status(status).send({
        data: {
          validationErrors: [
            {
              path: 'password',
              message: 'Wrong password. Try again',
            },
          ],
        },
      });
    }
    hasConfirmedEmail(user.isConfirmed);
    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
      },
      SECRET,
      { expiresIn: '1h' },
    );
    const { date, _id, isAdmin } = user;
    res.status(200).json({
      data: {
        token,
        user: {
          email,
          date,
          _id,
          isAdmin,
        },
      },
    });
  } catch (err) {
    passErrorToNext(err, next);
  }
};

// export const verifyEmail = async (
//   { params: { token } }: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   try {
//     // @ts-ignore
//     const { userId } = jwt.verify(token, process.env.SECRET);
//     const user = await getUserById(userId);
//     user.isConfirmed = true;
//     await user.save();
//     res.sendStatus(204);
//   } catch (err) {
//     passErrorToNext(err, next);
//   }
// };

// export const requestPasswordResetEmail = async (
//   { body: { email } }: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   try {
//     const { _id, isConfirmed } = await getUserByEmail(email);
//     hasConfirmedEmail(isConfirmed);
//     const { EMAIL, CLIENT_URL, SECRET } = process.env;
//     const token = jwt.sign(
//       {
//         userId: _id,
//       },
//       SECRET,
//       { expiresIn: '1h' },
//     );
//     const url = `${CLIENT_URL}/reset/${token}`;
//     const mailOptions: MailOptions = {
//       from: EMAIL,
//       to: email,
//       subject: 'TwittClone Password Reset',
//       html: htmlOutput.html,
//     };
//     sendEmail(mailOptions);
//     res.sendStatus(204);
//   } catch (err) {
//     passErrorToNext(err, next);
//   }
// };
// export const resetPassword = async (
//   { userId, body: { password } }: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   try {
//     const user = await getUserById(userId);
//     user.password = await bcrypt.hash(password, 12);
//     await user.save();
//     res.sendStatus(204);
//   } catch (err) {
//     passErrorToNext(err, next);
//   }
// };
// export const deleteUser = async (
//   { userId }: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   try {
//     await (await getUserById(userId)).remove();
//     res.sendStatus(204);
//   } catch (err) {
//     passErrorToNext(err, next);
//   }
// };

// export const patchProfile = async (
//   { body: { username, handle }, userId, files }: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   try {
//     const user = await getUserById(userId, false);
//     if (!Array.isArray(files) && files && files.avatar) {
//       const { filename, path } = files.avatar[0];
//       if (user.avatar) {
//         await deleteCloudinaryFile(user.avatar);
//       }
//       user.avatar = (await uploadToCloudinary(path, filename)).public_id;
//       deleteFile(path);
//     }
//     if (!Array.isArray(files) && files && files.cover) {
//       const { filename, path } = files.cover[0];
//       if (user.cover) {
//         await deleteCloudinaryFile(user.cover);
//       }
//       user.cover = (await uploadToCloudinary(path, filename)).public_id;
//       deleteFile(path);
//     }
//     user.username = username;
//     user.handle = handle;
//     await user.save();
//     res.status(200).json({ data: { user } });
//   } catch (err) {
//     passErrorToNext(err, next);
//   }
// };
