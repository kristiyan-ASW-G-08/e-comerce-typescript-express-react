import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
export interface Notification {
  content: string;
  type: 'message' | 'alert';
  isActive: boolean;
}

export const initialState = {
  content: '',
  type: 'alert',
  isActive: false,
};

const notificationSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setNotification: (state: any, action: PayloadAction<Notification>) => {
      return action.payload;
    },
    removeNotification: (state: any, action: PayloadAction<Notification>) => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, state => {
      return initialState;
    });
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
