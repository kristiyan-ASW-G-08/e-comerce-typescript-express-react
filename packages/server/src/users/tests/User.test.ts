import mongoose from 'mongoose';
import User from '@users/User';
import UserType from '@customTypes/UserType';
import connectToDB from '@utilities/connectToDB';
import duplicationErrorHandler from '@customMiddleware/duplicationErrorHandler';

jest.mock('@customMiddleware/duplicationErrorHandler');

const duplicationErrorHandlerMock = duplicationErrorHandler as jest.MockedFunction<
  typeof duplicationErrorHandler
>;

describe('User', (): void => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ol9wi.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  const email = 'testEmail@mail.com';
  const password = 'testPassword';
  beforeAll(
    async (): Promise<void> => {
      await connectToDB(mongoURI);
      await User.deleteMany({}).exec();
    },
  );
  afterEach(
    async (): Promise<void> => {
      await User.deleteMany({}).exec();
    },
  );
  afterAll(
    async (): Promise<void> => {
      await mongoose.disconnect();
    },
  );
  it('should throw an error when validation is not passed', async () => {
    expect.assertions(3);
    const userObj = {
      email,
      password,
    };
    await User.insertMany([userObj]);
    const user = new User(userObj);
    await expect(user.save()).rejects.toThrowError();
    expect(duplicationErrorHandlerMock).toHaveBeenCalledTimes(0);
    expect(user.validate).toThrowError();
  });
  it('should create a new user when validation is successful', async (): Promise<
    void
  > => {
    expect.assertions(8);
    const user: UserType = new User({
      email,
      password,
    });
    await expect(user.save()).resolves.not.toThrowError();
    expect(duplicationErrorHandlerMock).toHaveBeenCalledTimes(0);
    expect(user).toMatchObject({
      email,
      password,
    });
    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
    // email confirmation is disabled
    expect(user.isConfirmed).toBeTruthy();
    expect(user._id).toBeDefined();
    expect(user.isAdmin).toBeFalsy();
  });
});
