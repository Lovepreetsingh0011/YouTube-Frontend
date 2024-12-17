import { configureStore } from "@reduxjs/toolkit";
import { ThemeReducer } from "./Reducers/Theme";
import AuthUserReducer from "./Reducers/Authuser";
export const store = configureStore({
  reducer: {
    Theme: ThemeReducer,
    AuthUser: AuthUserReducer,
  },
});
