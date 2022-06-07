import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
export interface Checkout {
  address: string;
  phoneNumber: string;
  zip: string;
  city: string;
  fullName: string;
  country: string;
}

export const initialState = {
  address: '',
  phoneNumber: '',
  zip: '',
  city: '',
  fullName: '',
  country: '',
};

const authSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    registerCheckout: (state: any, action: PayloadAction<Checkout>) => {
      return action.payload;
    },
    removeCheckout: (state: any, action: PayloadAction) => {
      console.log(initialState);
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, state => {
      return initialState;
    });
  },
});

export const { registerCheckout, removeCheckout } = authSlice.actions;
export default authSlice.reducer;
