import React, { FC } from 'react';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Input from 'components/Input';
import postRequest from '@/utilities/postRequest';
import transformValidationErrors from '@/utilities/transformValidationErrors';
import ReviewValidator from '@eco/common/source/schemaValidators/ReviewValidator';
// import { loginAction } from '@/actions/authActions';
import FormWrapper from '@/components/FormWrapper';
import FormButton from '@/components/FormButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import createFormData from '@/utilities/createFormData';
import Review from '@eco/common/source/types/Review';
interface FormValues {
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
}
interface ReviewFormProps {
  productId: string;
  setReview: (review: Review) => void;
}
export const ReviewForm: FC<ReviewFormProps> = ({ productId, setReview }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authState = useSelector((state: any) => state.auth);

  const submitHandler = async (
    formValues: FormValues,
    { setErrors }: FormikHelpers<FormValues>,
  ): Promise<any> => {
    try {
      console.log(formValues);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${productId}/review`,
        {
          method: 'POST',
          body: JSON.stringify(formValues),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authState.token}`,
          },
        },
      );
      const { data } = await response.json();
      console.log(data);
      if (data?.validationErrors) {
        setErrors(transformValidationErrors(data.validationErrors));
      } else {
        setReview(data.review);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      validationSchema={ReviewValidator}
      initialValues={{
        content: '',
        rating: 1,
      }}
      onSubmit={submitHandler}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className="flex justify-center">
          <div className="p-24 w-full md:w-3/6 justify-center">
            <Input
              name="content"
              type="input"
              placeholder="Place Your Review"
            />
            <div className=" py-2 px-3">
              {Array.from(Array(5).keys()).map(number => (
                <button
                  type="button"
                  key={number}
                  onClick={() => setFieldValue('rating', number + 1)}
                >
                  {values.rating < number + 1 ? (
                    <FontAwesomeIcon icon={faStar} />
                  ) : (
                    <FontAwesomeIcon
                      className="text-yellow-400"
                      icon={faStar}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <FormButton
                content="Leave Your Review"
                isSubmitting={isSubmitting}
              />
              <button
                type="reset"
                className="text-red-400  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;
