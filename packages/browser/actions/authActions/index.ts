import { Action, AuthState } from '@/reducers/AuthReducers';
export const logoutAction = () => (dispatch: (action: Action) => void) => {
  dispatch({ type: 'LOGOUT' });
};

export const loginAction =
  (payload: AuthState) => (dispatch: (action: Action) => void) => {

    dispatch({
      type: 'LOGIN',
      payload,
    });
  };
