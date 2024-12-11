import { configureStore } from "@reduxjs/toolkit";
import { ThemeReducer } from "./Reducers/Theme";
export const store = configureStore({
  reducer: ThemeReducer,
});
