import React, { Dispatch, FC, SetStateAction } from 'react';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import CheckoutValidator from '@eco/common/source/schemaValidators/CheckoutValidator';
import Input from 'components/Input';
import postRequest from '@/utilities/postRequest';
import transformValidationErrors from '@/utilities/transformValidationErrors';
import FormWrapper from '@/components/FormWrapper';
import FormButton from '@/components/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  initialState,
  registerCheckout,
  removeCheckout,
} from 'slices/CheckoutSlice';
import { setNotification } from 'slices/NotificationSlice';
interface FormValues {
  address: string;
  phoneNumber: string;
  zip: string;
  city: string;
  fullName: string;
  country: string;
}

interface ContactInformationPageProps {
  incrementCurrentStep: () => void;
}
export const ContactInformationPage: FC<ContactInformationPageProps> = ({
  incrementCurrentStep,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const checkout = useSelector((state: any) => state.checkout);
  const submitHandler = async (
    formValues: FormValues,
    { setErrors }: FormikHelpers<FormValues>,
  ): Promise<any> => {
    try {
      dispatch(registerCheckout(formValues));
      incrementCurrentStep();
    } catch (error) {
      console.log(error);
    }
  };
  const resetHandler = () => {};
  return (
    <Formik
      validationSchema={CheckoutValidator}
      initialValues={checkout}
      onSubmit={submitHandler}
    >
      {({ isSubmitting, resetForm, setFieldValue }) => (
        <Form className="border rounded p-10 mx-4 w-full space-y-5">
          <h1 className="text-3xl font-bold">Contact Information</h1>
          <Input name="fullName" type="text" placeholder="Full Name" />
          <Input name="address" type="text" placeholder="Address" />
          <Input name="phoneNumber" type="tel" placeholder="Phone Number" />
          <Input name="zip" type="text" placeholder="Zip" />
          <Input name="country" type="text" placeholder="Country" />
          <Input name="city" type="text" placeholder="City" />
          <div className="flex items-center justify-between">
            <FormButton content="Continue" isSubmitting={false} />
            <button
              type="button"
              className="text-red-400  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                dispatch(removeCheckout());
                dispatch(removeCheckout());
                setFieldValue('address', '');
                setFieldValue('phoneNumber', '');
                setFieldValue('zip', '');
                setFieldValue('city', '');
                setFieldValue('fullName', '');
                setFieldValue('country', '');
              }}
            >
              Reset
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactInformationPage;
