import { login, logout, AuthState, initialState } from './index';

describe('auth reducers', () => {
  const authState: AuthState = {
    token: 'someToken',
    email: 'someEmail@Mail.tk',
    _id: 'someId',
    isAdmin: true,
  };
  it('login', () => {
    expect(login(authState)).toMatchObject(authState);
  });
  it('logout', () => {
    expect(logout(authState)).toMatchObject(initialState);
  });
});
