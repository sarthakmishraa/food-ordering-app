import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slices/cartSlice";
import menuSlice from "../slices/menuSlice";

export const store = configureStore({
  reducer: {
    cartSlice: cartSlice,
    menuSlice: menuSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
