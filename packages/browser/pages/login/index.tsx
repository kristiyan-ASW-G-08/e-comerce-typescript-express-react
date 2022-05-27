import React, { FC } from 'react';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import UserLoginValidator from '@eco/common/source/schemaValidators/UserLoginValidator';
import Input from 'components/Input';
import postRequest from '@/utilities/postRequest';
import transformValidationErrors from '@/utilities/transformValidationErrors';
// import { loginAction } from '@/actions/authActions';
import { login } from '../../slices/AuthSlice';
import { setAction, removeAction } from '@/actions/notificationActions';
import FormWrapper from '@/components/FormWrapper';
import FormButton from '@/components/FormButton';
interface FormValues {
  email: string;
  password: string;
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
      console.log(data);
      if (data?.validationErrors) {
        setErrors(transformValidationErrors(data.validationErrors));
      } else {
        const { token, user } = data;
        const authState = { token, ...user };
        //@ts-ignore
        // dispatch(
        //   //@ts-ignore
        //   setAction({
        //     content: 'You have logged in!',
        //     type: 'message',
        //     isActive: true,
        //   }),
        // );
        //@ts-ignore
        dispatch(login(authState));
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
      }}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }: { isSubmitting: boolean }) => (
        <FormWrapper>
          <Input name="email" type="email" placeholder="Email address" />

          <Input name="password" type="password" placeholder="Password" />
          <div className="flex items-center justify-between">
            <FormButton content="Login" isSubmitting={isSubmitting} />
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

export default LoginPage;
