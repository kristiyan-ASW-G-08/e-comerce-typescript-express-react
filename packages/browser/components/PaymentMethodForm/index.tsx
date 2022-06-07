import React, { FC, useEffect } from 'react';
import {
  Formik,
  Form,
  FormikValues,
  FormikHelpers,
  Field,
  useFormikContext,
  ErrorMessage,
} from 'formik';

import Input from 'components/Input';
import {
  method,
  registerPaymentMethod,
  PaymentMethod,
} from 'slices/PaymentMethodSlice';
import { useDispatch } from 'react-redux';
import FormButton from '../FormButton';
import PaymentValidator from '@eco/common/source/schemaValidators/PaymentValidator';
interface PaymentMethodFormProps {
  incrementCurrentStep: () => void;
}

export const PaymentMethodForm: FC<PaymentMethodFormProps> = ({
  incrementCurrentStep,
}) => {
  const dispatch = useDispatch();
  return (
    <Formik
      validationSchema={PaymentValidator}
      initialValues={{ method: '' }}
      onSubmit={(formValues: PaymentMethod) => {
        dispatch(registerPaymentMethod(formValues));
        incrementCurrentStep();
      }}
    >
      {({}) => (
        <Form className="flex justify-center flex-col border rounded p-10 mx-4 w-full ">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Payment Method</h1>
            <h2 className="text-lg font-bold text-neutral-500">SelectMethod</h2>
          </div>
          <div
            className="p-6 flex flex-col max-w-sm rounded overflow-hidden space-y-5"
            role="group"
            aria-labelledby="checkbox-group"
          >
            <label className="inline-block text-gray-800">
              <Field
                className=" rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="method"
                value="Paypal"
              />
              Paypal
            </label>
            <label className="inline-block text-gray-800">
              <Field
                className=" rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="method"
                value="Debit or Credit Card"
              />
              Debit Or Credit Card
            </label>

            <ErrorMessage
              className="text-red-400 text-xs italic"
              component="label"
              name={'method'}
            />
          </div>
          <div className="flex items-center justify-between">
            <FormButton content="Continue" isSubmitting={false} />
            <button
              type="reset"
              className="text-red-400  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Reset
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentMethodForm;
