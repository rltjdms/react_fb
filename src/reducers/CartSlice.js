import { createSlice } from '@reduxjs/toolkit';

let cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    cartCount(state, action) {
      const { payload: itemId } = action;
      const existingItem = state.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.count++;
      }
    },
    addItem(state, action) {
      const { payload: newItem } = action;
      const existingItem = state.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.count++;
      } else {
        state.push(newItem);
      }
    },
  },
});

export const { cartCount, addItem } = cart.actions;

export default cart;