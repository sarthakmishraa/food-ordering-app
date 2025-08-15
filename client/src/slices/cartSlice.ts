import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { IPurchasedItem } from "../utils/types";

export type CartState = {
  cart: IPurchasedItem[];
};

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    addItemToCart: (
      state,
      action: PayloadAction<IPurchasedItem>
    ) => {
      const newItem = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity += 1;
      } else {
        state.cart.push({ ...newItem, quantity: 1 });
      }
    },
  },
});

export const { addItemToCart } = cartSlice.actions;
export const useCart = (state: RootState) =>
  state.cartSlice.cart;
export default cartSlice.reducer;
