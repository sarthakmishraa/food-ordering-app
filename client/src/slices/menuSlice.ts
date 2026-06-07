import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import type {
  CommonRequestInput,
  RootState,
} from "../store/store";
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
    pageNumber: number;
    hasMore: boolean;
    totalElements: number | null;
  };
};

const initialState: MenuState = {
  menu: {
    data: null,
    networkStatus: NetworkStatusEnum.Idle,
    pageNumber: 0,
    hasMore: true,
    totalElements: null,
  },
};

export const getMenu = createAsyncThunk(
  "menu/getMenu",
  async ({ searchText }: CommonRequestInput, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const pageNumber = state.menuSlice.menu.pageNumber;
      const queryParams = new URLSearchParams({
        searchText: searchText ?? "",
        pageNumber: pageNumber.toString(),
      });
      const response = await fetch(
        `${BE_API_URL}/menu?${queryParams}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message);
      }

      return response.json();
    } catch (error: any) {
      const errorMessage = error?.message;
      toast.error(errorMessage ?? "Something went wrong", {
        style: toastStyles,
      });
      return thunkAPI.rejectWithValue(
        errorMessage || "Network Error"
      );
    }
  }
);

const menuSlice = createSlice({
  name: "menuSlice",
  initialState: initialState,
  reducers: {
    resetPageMenu: (state) => {
      state.menu.pageNumber = initialState.menu.pageNumber;
    },
    nextPageMenu: (state) => {
      state.menu.pageNumber = state.menu.pageNumber + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenu.pending, (state) => {
        state.menu.networkStatus =
          NetworkStatusEnum.Loading;
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        if (state.menu.pageNumber === 0) {
          state.menu.data = action.payload.data;
        } else {
          if (state.menu.data) {
            state.menu.data = [
              ...state.menu.data,
              ...action.payload.data,
            ];
          }
        }
        state.menu.hasMore = action.payload.hasMore;
        state.menu.totalElements =
          action.payload.totalItems;
        state.menu.networkStatus = NetworkStatusEnum.Loaded;
      })
      .addCase(getMenu.rejected, (state) => {
        state.menu.networkStatus = NetworkStatusEnum.Error;
      });
  },
});

export const { resetPageMenu, nextPageMenu } =
  menuSlice.actions;
export const useMenu = (state: RootState) =>
  state.menuSlice.menu;
export default menuSlice.reducer;
