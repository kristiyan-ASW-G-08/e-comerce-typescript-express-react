import { Form } from 'formik';
import { FC } from 'react';

interface FormWrapperProps {
  children: React.ReactNode;
}
const FormWrapper: FC<FormWrapperProps> = ({ children }) => {
  return (
    <div className="flex h-auto w-full justify-center items-center my-32">
      <Form className="flex flex-col w-full md:w-4/6 space-y-5 border rounded p-10 mx-4">
        {children}
      </Form>
    </div>
  );
};
export default FormWrapper;
