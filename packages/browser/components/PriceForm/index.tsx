import React, { FC, useEffect } from 'react';
import {
  Formik,
  Form,
  FormikValues,
  FormikHelpers,
  Field,
  useFormikContext,
} from 'formik';
import Input from 'components/Input';
// import { loginAction } from '@/actions/authActions';
interface FormValues {
  price: string;
}
interface PriceFormProps {
  setPrice: (price: string) => void;
  priceRanges: string[];
}

const ValueChangeListener = () => {
  const { submitForm, values } = useFormikContext();
  //@ts-ignore
  const { price } = values;

  useEffect(() => {
    if (price) {
      submitForm();
    }
  }, [price, submitForm]);

  return null;
};

export const PriceForm: FC<PriceFormProps> = ({ setPrice, priceRanges }) => {
  return (
    <Formik
      initialValues={{ price: '' }}
      onSubmit={(formValues: FormValues) => {
        setPrice(formValues.price);
      }}
    >
      {({ isSubmitting, setFieldValue, values, resetForm }) => (
        <Form className="flex justify-center">
          <div
            className="p-6 flex flex-col max-w-sm rounded overflow-hidden shadow-lg hover:scale-105  space-y-5"
            role="group"
            aria-labelledby="checkbox-group"
          >
            <p className="font-bold text-lg">Price</p>
            {priceRanges.map(price => (
              <label className="inline-block text-gray-800" key={price}>
                <Field
                  className=" rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="price"
                  value={price}
                />
                {price}
              </label>
            ))}
          </div>
          <ValueChangeListener />
        </Form>
      )}
    </Formik>
  );
};

export default PriceForm;
