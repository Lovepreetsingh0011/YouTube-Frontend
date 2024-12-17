import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Authuser",
  initialState: {
    user: {},
  },
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
    LogOutUser: (state, action) => {
      state.user = {};
    },
  },
});

export const { SetUser, LogOutUser } = AuthSlice.actions;
export default AuthSlice.reducer;
