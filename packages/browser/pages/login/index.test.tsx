import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import LoginPage from '.';
import postRequest from '@/utilities/postRequest';
import transformValidationErrors from '@/utilities/transformValidationErrors';
import createMockRouter from '../../testUtilities/createMockRouter';
import { Provider } from 'react-redux';
import AuthActions, { loginAction } from '@/actions/authActions';
import Store from '@/store/index';
jest.mock('@/utilities/postRequest');
jest.mock('@/actions/AuthActions/index');

const postRequestMock = postRequest as jest.MockedFunction<typeof postRequest>;
transformValidationErrors as jest.MockedFunction<
  typeof transformValidationErrors
>;
describe('LoginPage', () => {
  jest.setTimeout(30000);
  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());
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
    ];
    postRequestMock.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          token: 'someToken',
          user: {
            email: emailValue,
            _id: 'someId',
            isAdmin: false,
          },
        },
      }),
    );
    const { getByText, getByPlaceholderText } = render(<LoginPage />, {
      wrapper: ({ children }) => (
        <Provider store={Store}>
          <RouterContext.Provider value={createMockRouter({})}>
            {children}
          </RouterContext.Provider>
        </Provider>
      ),
    });

    for await (const { placeholder, value } of credentials) {
      const input = getByPlaceholderText(placeholder);
      await UserEvent.type(input, value);
      await waitFor(() => {
        expect(input).toHaveAttribute('value', value);
      });
    }

    const submitButton = getByText('Login');

    UserEvent.click(submitButton);

    await waitFor(() => {
      expect(postRequest).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(postRequest).toHaveBeenCalledWith('users/user/tokens', {
        email: emailValue,
        password,
      });
    });

    expect(loginAction).toHaveBeenCalledTimes(1);
    expect(loginAction).toHaveBeenCalledWith({
      _id: 'someId',
      email: 'testmail@test.test',
      isAdmin: false,
      token: 'someToken',
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
    ];
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <LoginPage />,
      {
        wrapper: ({ children }) => (
          <Provider store={Store}>
            <RouterContext.Provider value={createMockRouter({})}>
              {children}
            </RouterContext.Provider>
          </Provider>
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

    const submitButton = getByText('Login');

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

    expect(loginAction).not.toHaveBeenCalled();
  });

  it('it render: with validationErrors coming from request', async () => {
    // expect.assertions(8);
    postRequestMock.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          validationErrors: [
            { path: 'password', message: `Password is incorrect` },
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
    ];
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <LoginPage />,
      {
        wrapper: ({ children }) => (
          <Provider store={Store}>
            <RouterContext.Provider value={createMockRouter({})}>
              {children}
            </RouterContext.Provider>
          </Provider>
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

    const submitButton = getByText('Login');

    UserEvent.click(submitButton);

    await waitFor(() => {
      expect(postRequest).toHaveBeenCalled();
    });

    await waitFor(() => {
      const emailLabel = getByTestId('password-label');
      expect(emailLabel).toHaveTextContent(`Password is incorrect`);
    });

    expect(loginAction).not.toHaveBeenCalled();
  });
});
