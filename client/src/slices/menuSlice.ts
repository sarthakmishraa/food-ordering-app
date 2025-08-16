import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import {
  NetworkStatus,
  NetworkStatusEnum,
  toastStyles,
} from "../utils/constants";
import { IMenuItem } from "../utils/types";
import toast from "react-hot-toast";

const BE_API_URL = import.meta.env.VITE_BE_URL;

export type MenuState = {
  menu: {
    data: IMenuItem[] | null;
    networkStatus: NetworkStatus;
  };
};

const initialState: MenuState = {
  menu: {
    data: null,
    networkStatus: NetworkStatusEnum.Idle,
  },
};

export const getMenu = createAsyncThunk(
  "menu/getMenu",
  async () => {
    try {
      const response = await fetch(`${BE_API_URL}/menu`);
      return response.json();
    } catch (error) {
      toast.error("Something went wrong", {
        style: toastStyles,
      });
      throw new Error("Failed to fetch menu");
    }
  }
);

const menuSlice = createSlice({
  name: "menuSlice",
  initialState: initialState,
  reducers: {
    // addItemToCart: (
    //   state,
    //   action: PayloadAction<IPurchasedItem>
    // ) => {
    //   const newItem = action.payload;
    //   const existingItemIndex = state.cart.findIndex(
    //     (item) => item.id === newItem.id
    //   );
    //   if (existingItemIndex !== -1) {
    //     state.cart[existingItemIndex].quantity += 1;
    //   } else {
    //     state.cart.push({ ...newItem, quantity: 1 });
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenu.pending, (state) => {
        state.menu.networkStatus =
          NetworkStatusEnum.Loading;
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.menu.networkStatus = NetworkStatusEnum.Loaded;
        state.menu.data = action.payload;
      })
      .addCase(getMenu.rejected, (state) => {
        state.menu.networkStatus = NetworkStatusEnum.Error;
      });
  },
});

export const {} = menuSlice.actions;
export const useMenu = (state: RootState) =>
  state.menuSlice.menu;
export default menuSlice.reducer;
