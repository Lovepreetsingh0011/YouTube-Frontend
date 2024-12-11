import { createSlice } from "@reduxjs/toolkit";

const initsate = {
  Theme: true,
};
const ThemeSlicer = createSlice({
  name: "Theme",
  initialState: initsate,
  reducers: {
    ChangeTheme: (state, actions) => {
      state.Theme = !state.Theme;
    },
  },
});

export const { ChangeTheme } = ThemeSlicer.actions;
export const ThemeReducer = ThemeSlicer.reducer;
