import React, { FC } from 'react';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import UserSignUpValidator from '@eco/common/source/schemaValidators/UserSignUpValidator';
import Input from 'components/Input';
import postRequest from '@/utilities/postRequest';
import transformValidationErrors from '@/utilities/transformValidationErrors';
interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}
export const SignUpPage: FC = () => {
  const router = useRouter();
  const submitHandler = async (
    formValues: FormValues,
    { setErrors }: FormikHelpers<FormValues>,
  ): Promise<any> => {
    try {
      const responseData = await postRequest('users', formValues);
      if (responseData.data.validationErrors) {
        setErrors(
          transformValidationErrors(responseData.data.validationErrors),
        );
      } else {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      validationSchema={UserSignUpValidator}
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

            <Input
              name="confirmPassword"
              type="password"
              placeholder="Repeat Password"
            />
            <div className="flex items-center justify-between">
              <button
                className="bg-red-400 hover:bg-red-700 text-neutral-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
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

export default SignUpPage;
