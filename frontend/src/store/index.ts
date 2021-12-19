import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/index";
import UIReducer from "./UI/index";
import FormReducer from "./form/index";
export const store = configureStore({
  reducer: {
    user: userReducer,
    UI: UIReducer,
    form: FormReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
