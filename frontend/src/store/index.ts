import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/index";
import UIReducer from "./UI/index";
export const store = configureStore({
  reducer: {
    user: userReducer,
    UI: UIReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
