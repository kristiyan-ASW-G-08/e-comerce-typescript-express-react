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
  price: number;
}
interface PriceFormProps {
  setPrice: (price: string) => void;
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

export const PriceForm: FC<PriceFormProps> = ({ setPrice }) => {
  return (
    <Formik
      initialValues={{ min: 500, max: 2000, price: 2000 }}
      onSubmit={(formValues: FormValues) => {
        console.log(formValues);
        setPrice(`500-${formValues.price}`);
      }}
    >
      {({ isSubmitting, setFieldValue, values, resetForm, submitForm }) => (
        <Form className="flex justify-center">
          <div className="p-6 flex flex-col max-w-sm rounded overflow-hidden shadow-lg hover:scale-105  space-y-5">
            <Field type="range" name="price" min={500} max={2000} />
          </div>
          <ValueChangeListener />
        </Form>
      )}
    </Formik>
  );
};

export default PriceForm;
