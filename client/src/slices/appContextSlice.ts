import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import toast from "react-hot-toast";
import {
  IConfig,
  ISignInUser,
  IUserDetails,
} from "../utils/types";
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
  userDetails: {
    data: IUserDetails | null;
    networkStatus: NetworkStatus;
  };
};

const initialState: AppContextState = {
  uiConfig: {
    data: null,
    networkStatus: NetworkStatusEnum.Idle,
  },
  userDetails: {
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

export const signInUser = createAsyncThunk<ISignInUser>(
  "appContext/signIn",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const body = JSON.stringify(
        state.appContextSlice.userDetails.data
      );

      const response = await fetch(`${BE_API_URL}/signIn`, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message);
      }

      return response.json();
    } catch (error) {
      toast.error("Something went wrong", {
        style: toastStyles,
      });
      throw new Error("Failed to Sign In User");
    }
  }
);

export const signUpUser = createAsyncThunk<any>(
  "appContext/signUp",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const body = JSON.stringify(
        state.appContextSlice.userDetails.data
      );

      const response = await fetch(`${BE_API_URL}/signUp`, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message);
      }

      return response.json();
    } catch (error) {
      toast.error("Something went wrong", {
        style: toastStyles,
      });
      throw new Error("Failed to Sign Up User");
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
    updateUserDetails(
      state,
      action: PayloadAction<Partial<IUserDetails>>
    ) {
      const updatedUserDetails = action.payload;
      state.userDetails.data = {
        ...state.userDetails.data,
        ...updatedUserDetails,
      };
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
      })
      .addCase(signInUser.pending, (state) => {
        state.userDetails.networkStatus =
          NetworkStatusEnum.Loading;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.userDetails.data = {
          ...action.payload.user,
          loggedIn: true,
        };

        const localStorage = window.localStorage;
        const user = state.userDetails.data;
        const data = {
          user,
        };
        const stringifiedData = JSON.stringify(data);
        if (user?.loggedIn) {
          localStorage.setItem("foa", stringifiedData);
        }
      })
      .addCase(signInUser.rejected, (state) => {
        state.userDetails.networkStatus =
          NetworkStatusEnum.Error;
      });
  },
});

export const { updateUserDetails } =
  appContextSlice.actions;
export const useUIConfig = (state: RootState) =>
  state.appContextSlice.uiConfig;
export const useUserDetails = (state: RootState) =>
  state.appContextSlice.userDetails;

export default appContextSlice.reducer;
