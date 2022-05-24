import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Formik, Form } from 'formik';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Input from '.';
import UserSignUpValidator from '@eco/common/source/schemaValidators/UserSignUpValidator';

describe('Input', () => {
  const inputArr = [
    {
      name: 'email',
      type: 'email',
      value: 'test@test.test',
      placeholder: 'Email',
    },
    {
      name: 'password',
      type: 'password',
      value: 'newPasswordNewPassword',
      placeholder: 'Password',
    },
    {
      name: 'confirmPassword',
      type: 'password',
      value: 'newPasswordNewPassword',
      placeholder: 'Repeat Password',
    },
  ];
  afterAll(() => jest.restoreAllMocks());
  it.each(inputArr)('render Input', ({ name, type, value, placeholder }) => {
    const { getByPlaceholderText } = render(
      <Input name={name} placeholder={placeholder} type={type} />,
      {
        wrapper: ({ children }) => (
          <Formik
            validationSchema={UserSignUpValidator}
            initialValues={{}}
            onSubmit={jest.fn()}
          >
            <Form>{children}</Form>
          </Formik>
        ),
      },
    );
    const input = getByPlaceholderText(placeholder);

    userEvent.type(input, value);

    waitFor(() => {
      expect(input).toHaveAttribute('name', name);
    });
    waitFor(() => {
      expect(input).toHaveAttribute('type', type);
    });
    waitFor(() => {
      expect(input).toHaveAttribute('value', value);
    });
  });

  const falseInputArray = [
    {
      name: 'email',
      type: 'email',
      value: '',
      placeholder: 'Email',
    },
    {
      name: 'password',
      type: 'password',
      value: '',
      placeholder: 'Password',
    },
    {
      name: 'confirmPassword',
      type: 'password',
      value: '',
      placeholder: 'Repeat Password',
    },
  ];
  afterAll(() => jest.restoreAllMocks());
  it.each(falseInputArray)(
    'render Input with invalid values',
    ({ name, type, value, placeholder }) => {
      const { getByPlaceholderText, getByText } = render(
        <Input name={name} placeholder={placeholder} type={type} />,
        {
          wrapper: ({ children }) => (
            <Formik
              validationSchema={UserSignUpValidator}
              initialValues={{}}
              onSubmit={jest.fn()}
            >
              <Form>{children}</Form>
            </Formik>
          ),
        },
      );
      const input = getByPlaceholderText(placeholder);

      userEvent.type(input, value);

      expect(input).toHaveAttribute('name', name);
      expect(input).toHaveAttribute('type', type);
      expect(input).toHaveAttribute('value', value);
    },
  );
});
