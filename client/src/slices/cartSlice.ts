import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import {
  ICartSummary,
  IPurchasedItem,
} from "../utils/types";
import toast from "react-hot-toast";
import {
  NetworkStatus,
  NetworkStatusEnum,
  toastStyles,
} from "../utils/constants";

const BE_API_URL = import.meta.env.VITE_BE_URL;

export type CartState = {
  cart: IPurchasedItem[];
  cartSummary: {
    data: ICartSummary | null;
    networkStatus: NetworkStatus;
  };
};

const initialState: CartState = {
  cart: [],
  cartSummary: {
    data: null,
    networkStatus: NetworkStatusEnum.Idle,
  },
};

export const getCartSummary = createAsyncThunk<
  any,
  IPurchasedItem[]
>("cart/getCartSummary", async (cart) => {
  try {
    const response = await fetch(`${BE_API_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });
    return response.json();
  } catch (error) {
    toast.error("Something went wrong", {
      style: toastStyles,
    });
    throw new Error("Failed to fetch menu");
  }
});

const cartSlice = createSlice({
  name: "cartSlice",
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
    decreaseQuantityFromCart: (
      state,
      action: PayloadAction<IPurchasedItem>
    ) => {
      const itemToUse = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item?.id === itemToUse?.id
      );

      if (existingItemIndex !== -1) {
        const item = state.cart[existingItemIndex];
        item.quantity -= 1;

        if (item.quantity <= 0) {
          state.cart.splice(existingItemIndex, 1);
        }
      }
    },
    removeItemFromCart: (
      state,
      action: PayloadAction<IPurchasedItem>
    ) => {
      const itemToUse = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item?.id === itemToUse?.id
      );

      if (existingItemIndex !== -1) {
        state.cart.splice(existingItemIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartSummary.pending, (state) => {
        state.cartSummary.networkStatus =
          NetworkStatusEnum.Loading;
      })
      .addCase(
        getCartSummary.fulfilled,
        (state, action) => {
          state.cartSummary.networkStatus =
            NetworkStatusEnum.Loaded;
          state.cartSummary.data = action.payload;
        }
      )
      .addCase(getCartSummary.rejected, (state) => {
        state.cartSummary.networkStatus =
          NetworkStatusEnum.Error;
      });
  },
});

export const {
  addItemToCart,
  decreaseQuantityFromCart,
  removeItemFromCart,
} = cartSlice.actions;
export const useCart = (state: RootState) =>
  state.cartSlice.cart;
export const useCartSummary = (state: RootState) =>
  state.cartSlice.cartSummary;
export default cartSlice.reducer;
