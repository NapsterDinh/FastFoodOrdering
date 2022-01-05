import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lang: 'vi',
  roomId: null,
  totalPrice: '',
};

export const counterSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateLanguage: (state, action) => {
      state.lang = action.payload;
    },
    updateRoomId:(state, action) => {
      state.roomId = action.payload;
    },
    updateTotalPrice:(state, action) => {
      state.totalPrice = action.payload;
    },
  },
});

export const { updateLanguage, updateRoomId, updateTotalPrice } = counterSlice.actions;

export default counterSlice.reducer;
