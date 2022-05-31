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
  brand: string;
}
interface BrandFormProps {
  setBrand: (brand: string) => void;
  brands: string[];
}

const ValueChangeListener = () => {
  const { submitForm, values } = useFormikContext();
  //@ts-ignore
  const { brand } = values;

  useEffect(() => {
    if (brand) {
      submitForm();
    }
  }, [brand, submitForm]);

  return null;
};

export const BrandForm: FC<BrandFormProps> = ({ setBrand, brands }) => {
  return (
    <Formik
      initialValues={{ brand: '' }}
      onSubmit={(formValues: FormValues) => {
 
        setBrand(formValues.brand);
      }}
    >
      <Form className="flex justify-center">
        <div
          className="p-6 flex flex-col max-w-sm rounded overflow-hidden shadow-lg hover:scale-105  space-y-5"
          role="group"
          aria-labelledby="checkbox-group"
        >
          <p className="font-bold text-lg">Brands</p>
          {brands.map(brand => (
            <label className="inline-block text-gray-800" key={brand}>
              <Field
                className=" rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="brand"
                value={brand}
              />
              {brand}
            </label>
          ))}
        </div>
        <ValueChangeListener />
      </Form>
    </Formik>
  );
};

export default BrandForm;
