import mongoose from 'mongoose';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '@src/app';
import User from '@users/User';
import connectToDB from '@utilities/connectToDB';
import sendEmail from '@utilities/sendEmail';

const port = process.env.PORT || 8080;

describe('userRoutes', () => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ol9wi.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  beforeAll(async () => {
    await mongoose.disconnect();
    await connectToDB(mongoURI);
    app.listen(port);
    await User.deleteMany({}).exec();
  });
  afterEach(async () => {
    await User.deleteMany({}).exec();
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  const email = 'testmail@mail.com';
  const password = 'testPassword';
  const invalidEmail = 'testmail';
  const invalidPassword = '1234';
  describe('/users', () => {
    it('should create a new user', async () => {
      expect.assertions(1);
      const response = await request(app)
        .post('/users')
        .send({
          email,
          password,
          confirmPassword: password,
        });
      expect(response.status).toBe(201);
    });
  });
  it("should throw an error with a status of 400: BadRequest when the req body doesn't pass validation", async (): Promise<
    void
  > => {
    expect.assertions(2);
    const response = await request(app)
      .post('/users')
      .send({
        email: invalidEmail,
        password: invalidPassword,
        confirmPassword: password,
      });
    expect(response.status).toBe(400);
    expect(response.body).toMatchSnapshot();
    // expect(sendEmail).not.toHaveBeenCalled();
  });
  it("should throw an error with a status of 400: BadRequest when the req body doesn't pass validation", async (): Promise<
    void
  > => {
    expect.assertions(2);
    const response = await request(app).post('/users');
    expect(response.status).toBe(400);
    expect(response.body).toMatchSnapshot();
    // expect(sendEmail).not.toHaveBeenCalled();
  });
  it('should throw an error with a status of 409: Conflict when the user credentials are already taken', async (): Promise<
    void
  > => {
    expect.assertions(1);
    await User.insertMany({ email, password });
    const response = await request(app)
      .post('/users')
      .send({
        email,
        password,
        confirmPassword: password,
      });
    expect(response.status).toBe(409);
    // expect(sendEmail).not.toHaveBeenCalled();
  });
});
