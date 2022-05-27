import React, { FC } from 'react';
import { Formik, Form, FormikValues, FormikHelpers, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ProductValidatorClient from '@eco/common/source/schemaValidators/ProductValidatorClient';
import Input from 'components/Input';
import postRequest from '@/utilities/postRequest';
import transformValidationErrors from '@/utilities/transformValidationErrors';
import { setAction, removeAction } from '@/actions/notificationActions';
import FormWrapper from '@/components/FormWrapper';
import FormButton from '@/components/FormButton';
import UploadButton from '@/components/UploadButton';
import createFormData from '@/utilities/createFormData';
import { categories } from '@eco/common/source/schemaValidators/ProductValidator';
export interface SpecificationField {
  path: string;
  value: string;
}
interface FormValues {
  name: string;
  files: File[];
  specifications: SpecificationField[];
  brand: string;
  category:
    | 'Phones & Tablets'
    | 'Laptops & Computers'
    | 'TV'
    | 'Audio'
    | 'Peripherals';
  description: string;
  price: number;
  inStock: number;
}
export const CreateProductPage: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authState = useSelector((state: any) => state.auth);
  const submitHandler = async (
    formValues: FormValues,
    { setErrors }: FormikHelpers<FormValues>,
  ): Promise<any> => {
    console.log(formValues);
    try {
      console.log(formValues);

      const valuesWithoutEntries = Object.fromEntries(
        Object.entries(formValues).filter(
          ([key, value]) => key !== 'specifications' && 'files',
        ),
      );

      //@ts-ignore
      const formData = createFormData(valuesWithoutEntries);
      formData.append(
        'specifications',
        JSON.stringify(formValues.specifications),
      );
      formValues.files.forEach(file => formData.append('files', file));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/products`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        },
      );

      const { data } = await response.json();
      if (data?.validationErrors) {
        setErrors(transformValidationErrors(data.validationErrors));
      } else if (data.productId) {
        router.push(`/product/${data.productId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      validationSchema={ProductValidatorClient}
      initialValues={{
        name: '',
        files: [],
        specifications: [],
        brand: '',
        //@ts-ignore
        category: categories[0],
        description: '',
        price: 0,
        inStock: 0,
      }}
      onSubmit={submitHandler}
    >
      {({ isSubmitting, setFieldValue, values, getFieldProps, errors }) => (
        <FormWrapper>
          <>
            <Input name="name" type="text" placeholder="Name" />
            <Input name="brand" type="text" placeholder="Brand" />
            <Input
              name="description"
              component="textarea"
              type="text"
              placeholder="Description"
            />
            <Input name="price" type="number" placeholder="Price" />
            <Input name="stock" type="number" placeholder="Stock(quantity)" />

            <Field as="select" name="category">
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Field>
            {values.specifications.map((value, index) => {
              return (
                <div
                  className="border rounded p-3  flex space-x-5 flow-col"
                  key={index}
                >
                  <Input {...getFieldProps(`specifications[${index}].name`)} />
                  <Input
                    {...getFieldProps(`specifications[${index}].description`)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFieldValue('specifications', [
                        ...values.specifications.filter((_, i) => i !== index),
                      ]);
                    }}
                  >
                    Remove Specification
                  </button>
                </div>
              );
            })}

            {values.files.map((value, index) => {
              return (
                <div
                  className="border rounded p-3  flex space-x-5 flow-col"
                  key={index}
                >
                  {}
                  <UploadButton
                    {...getFieldProps(`files[${index}]`)}
                    name={`files[${index}]`}
                    setFieldValue={setFieldValue}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFieldValue('files', [
                        ...values.files.filter((_, i) => i !== index),
                      ]);
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              );
            })}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setFieldValue('specifications', [
                    ...values.specifications,
                    { name: '', description: '' },
                  ]);
                }}
                type="button"
                className="text-red-400  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Specification
              </button>
              <p className="text-red-400 ">
                {typeof errors.specifications === 'string'
                  ? errors.specifications
                  : ''}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setFieldValue('files', [...values.files, '']);
                }}
                type="button"
                className="text-red-400  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Image
              </button>
              <p className="text-red-400 ">
                {typeof errors.files === 'string' ? errors.files : ''}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <FormButton
                content="Create New Product"
                isSubmitting={isSubmitting}
              />
              <button
                type="reset"
                className="text-red-400  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset
              </button>
            </div>
          </>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default CreateProductPage;
