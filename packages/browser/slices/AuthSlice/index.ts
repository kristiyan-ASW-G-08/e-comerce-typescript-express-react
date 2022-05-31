import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
export interface AuthState {
  _id: string;
  token: string;
  email: string;
  isAdmin: boolean;
}

export const initialState = {
  token: '',
  email: '',
  _id: '',
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: any, action: PayloadAction<AuthState>) => {
      return action.payload;
    },
    logout: (state: any, action: PayloadAction<AuthState>) => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, state => {
      return initialState;
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
