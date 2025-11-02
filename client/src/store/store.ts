import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slices/cartSlice";
import menuSlice from "../slices/menuSlice";
import appContextSlice from "../slices/appContextSlice";
import chatWithGustoSlice from "../slices/chatWithGustoSlice";

export const store = configureStore({
  reducer: {
    cartSlice: cartSlice,
    menuSlice: menuSlice,
    appContextSlice: appContextSlice,
    chatWithGusto: chatWithGustoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
