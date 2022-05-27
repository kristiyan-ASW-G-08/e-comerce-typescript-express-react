import React, { FC } from 'react';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Input from 'components/Input';
import postRequest from '@/utilities/postRequest';
import transformValidationErrors from '@/utilities/transformValidationErrors';
// import { loginAction } from '@/actions/authActions';
import FormWrapper from '@/components/FormWrapper';
import FormButton from '@/components/FormButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
interface FormValues {
  review: string;
  rating: 1 | 2 | 3 | 4 | 5;
}
export const ReviewForm: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const submitHandler = async (
    formValues: FormValues,
    { setErrors }: FormikHelpers<FormValues>,
  ): Promise<any> => {
    try {
      // const { data } = await postRequest('reviews', formValues);
      // if (data?.validationErrors) {
      //   setErrors(transformValidationErrors(data.validationErrors));
      // } else {
      //   //@ts-ignore
      //   // dispatch(
      //   //   //@ts-ignore
      //   //   setAction({
      //   //     content: 'You have logged in!',
      //   //     type: 'message',
      //   //     isActive: true,
      //   //   }),
      //   // );
      //   //@ts-ignore
      //   dispatch(login(authState));
      // }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={{
        review: '',
        rating: 1,
      }}
      onSubmit={submitHandler}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className="flex justify-center">
          <div className="p-24 w-full md:w-3/6 justify-center">
            <Input name="review" type="input" placeholder="Review" />
            <div className=" py-2 px-3">
              {Array.from(Array(5).keys()).map(number => (
                <button
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
