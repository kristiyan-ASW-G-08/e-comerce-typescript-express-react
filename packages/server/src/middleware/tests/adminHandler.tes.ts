import mongoose from 'mongoose';
import httpMocks from 'node-mocks-http';
import jwt from 'jsonwebtoken';
import adminHandler from '@customMiddleware/adminHandler';
import RESTError from '@utilities/RESTError';
import ValidationError from '@eco/common/source/types/ValidationError';

jest.mock('@utilities/RESTError');

const RESTErrorMock = RESTError as jest.MockedClass<typeof RESTError>;

jest.spyOn(jwt, 'verify');
RESTErrorMock.mockImplementationOnce(
  (status: number, message: string, data?: ValidationError[] | string) => ({
    status,
    message,
    data,
    name: 'error',
  }),
);

describe('adminHandler', (): void => {
  const { SECRET } = process.env;
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.restoreAllMocks());
  it(`should add userId to req when the authorization header is valid and user is admin`, async (): Promise<
    void
  > => {
    expect.assertions(5);
    const nextMock = jest.fn();
    const userId = new mongoose.Types.ObjectId();
    const token = jwt.sign(
      {
        isAdmin: true,
        userId,
      },
      SECRET,
      { expiresIn: '1h', algorithm: 'HS256' },
    );
    const reqMock = httpMocks.createRequest({
      method: 'POST',
      url: '/',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resMock = httpMocks.createResponse();
    adminHandler(reqMock, resMock, nextMock);

    expect(jwt.verify).toHaveBeenCalledTimes(1);
    expect(jwt.verify).toHaveBeenCalledWith(token, SECRET);
    expect(jwt.verify).toHaveReturnedTimes(1);
    expect(reqMock.userId).toMatch(userId.toString());
    expect(nextMock).toBeCalledTimes(1);
  });
  it('should throw an error with a status of 401: Unauthorized when there is no authorization header', async (): Promise<
    void
  > => {
    expect.assertions(1);
    const nextMock = jest.fn();
    const reqMock = httpMocks.createRequest({
      method: 'POST',
      url: '/',
    });
    const resMock = httpMocks.createResponse();

    expect((): void =>
      adminHandler(reqMock, resMock, nextMock),
    ).toThrowErrorMatchingSnapshot();
  });
  it('should throw an error with a status of 403: Forbidden when the user is not admin ', async (): Promise<
    void
  > => {
    expect.assertions(1);
    const nextMock = jest.fn();
    const token = jwt.sign({ isAdmin: false }, SECRET, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });
    const reqMock = httpMocks.createRequest({
      method: 'POST',
      url: '/',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resMock = httpMocks.createResponse();

    expect((): void =>
      adminHandler(reqMock, resMock, nextMock),
    ).toThrowErrorMatchingSnapshot();
  });
});
