import { authReducer } from './index';

describe('AuthReducers', () => {
  const initialAuthState = {
    token: '',
    email: '',
    _id: '',
    isAdmin: false,
  };

  const authState = {
    token: 'token',
    email: 'mail@mail.com',
    _id: 'id',
    isAdmin: false,
  };
  it('LOGIN', () => {
    expect(
      authReducer(initialAuthState, { type: 'LOGIN', payload: authState }),
    ).toMatchObject(authState);
  });
  it('LOGOUT', () => {
    expect(
      authReducer(initialAuthState, { type: 'LOGOUT', payload: authState }),
    ).toMatchObject(initialAuthState);
  });
});
