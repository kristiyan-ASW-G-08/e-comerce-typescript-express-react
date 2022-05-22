export interface AuthState {
  userId: string;
  token: string;
  email: string;
  isAdmin: boolean;
}

const initialAuthState = {
  token: '',
  email: '',
  userId: '',
  isAdmin: false,
};

export interface Action {
  type: 'LOGIN' | 'LOGOUT';
  payload?: AuthState;
}
export const authReducer = (state = initialAuthState, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;

    case 'LOGOUT':
      return initialAuthState;

    default:
      return initialAuthState;
  }
};
