import React, { FC } from 'react';
import { Formik, Form, FormikValues, FormikHelpers, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ProductValidator from '@eco/common/source/schemaValidators/ProductValidator';
import Input from 'components/Input';
import postRequest from '@/utilities/postRequest';
import transformValidationErrors from '@/utilities/transformValidationErrors';
import { setAction, removeAction } from '@/actions/notificationActions';
import FormWrapper from '@/components/FormWrapper';
import FormButton from '@/components/FormButton';
import UploadButton from '@/components/UploadButton';
import createFormData from '@/utilities/createFormData';
import { categories } from '@eco/common/source/schemaValidators/ProductValidator';
import { NextPage } from 'next';
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
    | 'Phones and Tablets'
    | 'Laptops and Computers'
    | 'TV'
    | 'Audio'
    | 'Peripherals';
  description: string;
  price: number;
  stock: number;
}
interface EditProductProps {
  name: string;
  files: string[];
  specifications: SpecificationField[];
  brand: string;
  category:
    | 'Phones and Tablets'
    | 'Laptops and Computers'
    | 'TV'
    | 'Audio'
    | 'Peripherals';
  description: string;
  price: number;
  stock: number;
  _id: string;
}
export const EditProduct: NextPage<EditProductProps> = ({
  name,
  files,
  specifications,
  brand,
  //@ts-ignore
  category,
  description,
  price,
  stock,
  _id,
}) => {
  console.log();
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${_id}`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        },
      );

      const { data } = await response.json();
      console.log(data);
      if (data?.validationErrors) {
        setErrors(transformValidationErrors(data.validationErrors));
      } else if (data.productId) {
        router.push(`/products/${data.productId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      validationSchema={ProductValidator}
      initialValues={{
        name,
        files: [],
        specifications,
        brand,
        //@ts-ignore
        category,
        description,
        price,
        stock,
      }}
      //@ts-ignore
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
                content="Edit Product"
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

export async function getServerSideProps(context: any) {
  const { productId } = context.query;
  console.log(productId);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${productId}`,
  );
  const {
    data: { product },
  } = await response.json();
  return {
    props: {
      ...product,
    },
  };
}
export default EditProduct;
