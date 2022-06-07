import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

export type method = 'Paypal' | 'Debit or Credit Card' | '';
export interface PaymentMethod {
  method: method;
}

export const initialState = {
  method: '',
};

const paymentReducer = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    registerPaymentMethod: (
      state: any,
      action: PayloadAction<PaymentMethod>,
    ) => {
      return action.payload;
    },
    removePaymentMethod: (state: any, action: PayloadAction) => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, state => {
      return initialState;
    });
  },
});

export const { registerPaymentMethod, removePaymentMethod } =
  paymentReducer.actions;
export default paymentReducer.reducer;
