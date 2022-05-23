import React, { FC } from 'react';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import UserLoginValidator from '@eco/common/source/schemaValidators/UserLoginValidator';
import Input from 'components/Input';
import postRequest from '@/utilities/postRequest';
import transformValidationErrors from '@/utilities/transformValidationErrors';
import { loginAction } from '@/actions/authActions';
import { setAction, removeAction } from '@/actions/notificationActions';
interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}
export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const submitHandler = async (
    formValues: FormValues,
    { setErrors }: FormikHelpers<FormValues>,
  ): Promise<any> => {
    try {
      const { data } = await postRequest('users/user/tokens', formValues);
      if (data.validationErrors) {
        setErrors(transformValidationErrors(data.validationErrors));
      } else {
        console.log(data);
        const { token, user } = data;
        const authState = { token, ...user };
        console.log(authState);

        //@ts-ignore
        dispatch(
          //@ts-ignore
          setAction({
            content: 'You have logged in!',
            type: 'message',
            isActive: true,
          }),
        );
        //@ts-ignore
        dispatch(loginAction(authState));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      validationSchema={UserLoginValidator}
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }: { isSubmitting: boolean }) => (
        <div className="flex h-96 w-full justify-center items-center my-32">
          <Form className="flex flex-col w-full md:w-3/6 space-y-5 border rounded p-10 mx-4">
            <Input name="email" type="email" placeholder="Email address" />

            <Input name="password" type="password" placeholder="Password" />
            <div className="flex items-center justify-between">
              <button
                className="bg-red-400 hover:bg-red-700 text-neutral-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
              <button
                type="reset"
                className="text-red-400  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginPage;
