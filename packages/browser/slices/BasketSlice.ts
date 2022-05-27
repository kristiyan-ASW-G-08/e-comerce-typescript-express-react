import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
export interface BasketProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}
type _id = string;
const initialState: BasketProduct[] = [];

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProduct: (
      state: BasketProduct[],
      action: PayloadAction<BasketProduct>,
    ) => {
      console.log(action, state);
      const hasProduct = state.find(
        product => product._id == action.payload._id,
      );
      if (hasProduct) {
        const updatedState = state.map(product => {
          if (product._id === action.payload._id) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        });
        return updatedState;
      } else {
        return [...state, action.payload];
      }
    },
    removeProduct: (state: BasketProduct[], action: PayloadAction<_id>) => {
      console.log(action);
      return [...state.filter(product => product._id !== action.payload)];
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, state => {
      return initialState;
    });
  },
});

export const { addProduct, removeProduct } = basketSlice.actions;
export default basketSlice.reducer;