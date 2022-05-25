import React, { FC } from 'react';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import UserSignUpValidator from '@eco/common/source/schemaValidators/UserSignUpValidator';
import Input from 'components/Input';
import postRequest from '@/utilities/postRequest';
import transformValidationErrors from '@/utilities/transformValidationErrors';
import FormWrapper from '@/components/FormWrapper';
import FormButton from '@/components/FormButton';
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
      const { data } = await postRequest('users', formValues);
      console.log(data.validationErrors, 'Daaaaaaaaaaaaata');
      if (data.validationErrors) {
        console.log('SET Errors');
        setErrors(transformValidationErrors(data.validationErrors));
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
        <FormWrapper>
          <Input name="email" type="email" placeholder="Email address" />

          <Input name="password" type="password" placeholder="Password" />

          <Input
            name="confirmPassword"
            type="password"
            placeholder="Repeat Password"
          />
          <div className="flex items-center justify-between">
            <FormButton content="Sign Up" isSubmitting={isSubmitting} />
            <button
              type="reset"
              className="text-red-400  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Reset
            </button>
          </div>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default SignUpPage;
