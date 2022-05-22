import { Action, AuthState } from '@/reducers/AuthReducers';
export const logoutAction = (dispatch: (action: Action) => void) => {
  dispatch({ type: 'LOGOUT' });
};

export const loginAction = (
  dispatch: (action: Action) => void,
  payload: AuthState,
) => {
  dispatch({ type: 'LOGIN', payload  });
};
