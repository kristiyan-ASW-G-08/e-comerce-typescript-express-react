import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import SignUpPage from '.';
import postRequest from '@/utilities/postRequest';
import transformValidationErrors from '@/utilities/transformValidationErrors';
import createMockRouter from '../../testUtilities/createMockRouter';

jest.mock('@/utilities/postRequest');

const postRequestMock = postRequest as jest.MockedFunction<typeof postRequest>;
transformValidationErrors as jest.MockedFunction<
  typeof transformValidationErrors
>;
describe('SignUpPage', () => {
  jest.setTimeout(30000);
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.clearAllMocks());
  it('it renders', async () => {
    // expect.assertions(8);
    const password = 'passwordpassword';
    const emailValue = 'testmail@test.test';
    const credentials = [
      {
        value: emailValue,
        placeholder: 'Email address',
      },
      {
        value: password,
        placeholder: 'Password',
      },
      {
        value: password,
        placeholder: 'Repeat Password',
      },
    ];
    const { getByText, getByPlaceholderText } = render(<SignUpPage />, {
      wrapper: ({ children }) => (
        <RouterContext.Provider value={createMockRouter({})}>
          {children}
        </RouterContext.Provider>
      ),
    });

    for await (const { placeholder, value } of credentials) {
      const input = getByPlaceholderText(placeholder);
      await UserEvent.type(input, value);
      await waitFor(() => {
        expect(input).toHaveAttribute('value', value);
      });
    }

    const submitButton = getByText('Sign Up');

    UserEvent.click(submitButton);

    await waitFor(() => {
      expect(postRequest).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(postRequest).toHaveBeenCalledWith('users', {
        email: emailValue,
        password,
        confirmPassword: password,
      });
    });
  });

  it('it render: with validationErrors', async () => {
    // expect.assertions(8);
    const password = 'passwordpassword';
    const emailValue = 'testmail@test.test';
    const credentials = [
      {
        value: 'invalid',
        placeholder: 'Email address',
        name: 'email',
      },
      {
        value: 'invalid',
        placeholder: 'Password',
        name: 'password',
      },
      {
        value: 'invalid',
        placeholder: 'Repeat Password',
        name: 'confirmPassword',
      },
    ];
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <SignUpPage />,
      {
        wrapper: ({ children }) => (
          <RouterContext.Provider value={createMockRouter({})}>
            {children}
          </RouterContext.Provider>
        ),
      },
    );

    for await (const { placeholder, value } of credentials) {
      const input = getByPlaceholderText(placeholder);
      await UserEvent.type(input, 'invalid');
      await waitFor(() => {
        expect(input).toHaveAttribute('value', 'invalid');
      });
    }

    const submitButton = getByText('Sign Up');

    UserEvent.click(submitButton);

    await waitFor(() => {
      expect(postRequest).not.toHaveBeenCalled();
    });

    for await (const { name } of credentials) {
      await waitFor(() => {
        const label = getByTestId(`${name}-label`);
        expect(label).toBeInTheDocument();
      });
    }
  });

  it('it render: with validationErrors coming from request', async () => {
    // expect.assertions(8);
    postRequestMock.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          validationErrors: [
            { path: 'email', message: `${emailValue} is already taken` },
          ],
        },
      }),
    );

    const password = 'passwordpassword';
    const emailValue = 'testmail@test.test';
    const credentials = [
      {
        value: emailValue,
        placeholder: 'Email address',
      },
      {
        value: password,
        placeholder: 'Password',
      },
      {
        value: password,
        placeholder: 'Repeat Password',
      },
    ];
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <SignUpPage />,
      {
        wrapper: ({ children }) => (
          <RouterContext.Provider value={createMockRouter({})}>
            {children}
          </RouterContext.Provider>
        ),
      },
    );

    for await (const { placeholder, value } of credentials) {
      const input = getByPlaceholderText(placeholder);
      await UserEvent.type(input, value);
      await waitFor(() => {
        expect(input).toHaveAttribute('value', value);
      });
    }

    const submitButton = getByText('Sign Up');

    UserEvent.click(submitButton);

    await waitFor(() => {
      expect(postRequest).toHaveBeenCalled();
    });

    await waitFor(() => {
      const emailLabel = getByTestId('email-label');
      expect(emailLabel).toHaveTextContent(`${emailValue} is already taken`);
    });
  });
});
