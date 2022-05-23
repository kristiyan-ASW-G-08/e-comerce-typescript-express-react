export interface AuthState {
  _id: string;
  token: string;
  email: string;
  isAdmin: boolean;
}

const initialAuthState = {
  token: '',
  email: '',
  _id: '',
  isAdmin: false,
};

export interface Action {
  type: 'LOGIN' | 'LOGOUT';
  payload?: AuthState;
}
export const authReducer = (
  state = initialAuthState,
  { type, payload }: Action,
) => {
  switch (type) {
    case 'LOGIN':
      return payload;

    case 'LOGOUT':
      return initialAuthState;

    default:
      return state;
  }
};
