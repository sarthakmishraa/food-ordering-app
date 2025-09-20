import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import toast from "react-hot-toast";
import { IConfig } from "../utils/types";
import {
  NetworkStatus,
  NetworkStatusEnum,
  toastStyles,
} from "../utils/constants";

const BE_API_URL = import.meta.env.VITE_BE_URL;

export type AppContextState = {
  uiConfig: {
    data: IConfig | null;
    networkStatus: NetworkStatus;
  };
};

const initialState: AppContextState = {
  uiConfig: {
    data: null,
    networkStatus: NetworkStatusEnum.Idle,
  },
};

export const getUIConfig = createAsyncThunk<IConfig>(
  "appContext/config",
  async () => {
    try {
      const response = await fetch(`${BE_API_URL}/config`);
      return response.json();
    } catch (error) {
      toast.error("Something went wrong", {
        style: toastStyles,
      });
      throw new Error("Failed to fetch menu");
    }
  }
);

const appContextSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    resetUIConfig(state) {
      state.uiConfig = initialState.uiConfig;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUIConfig.pending, (state) => {
        state.uiConfig.networkStatus =
          NetworkStatusEnum.Loading;
      })
      .addCase(getUIConfig.fulfilled, (state, action) => {
        state.uiConfig.networkStatus =
          NetworkStatusEnum.Loaded;
        state.uiConfig.data = action.payload;
      })
      .addCase(getUIConfig.rejected, (state) => {
        state.uiConfig.networkStatus =
          NetworkStatusEnum.Error;
      });
  },
});

export const {
  //
} = appContextSlice.actions;
export const useUIConfig = (state: RootState) =>
  state.appContextSlice.uiConfig;

export default appContextSlice.reducer;
