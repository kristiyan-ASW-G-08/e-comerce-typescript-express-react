import React, { FC } from 'react';
import { Field, ErrorMessage } from 'formik';

interface InputProps {
  name?: string;
  placeholder?: string;
  type?: string;
  component?: 'input' | 'textarea';
}

export const Input: FC<InputProps> = ({
  name = 'email',
  placeholder,
  type,
  component = 'input',
}) => (
  <div>
    <Field
      className="shadow appearance-none border border-red-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline "
      name={name}
      type={type}
      placeholder={placeholder}
      component={component}
    />
    <ErrorMessage
      data-testid={`${name}-label`}
      className="text-red-400 text-xs italic"
      component="label"
      name={name}
    />
  </div>
);

export default Input;
