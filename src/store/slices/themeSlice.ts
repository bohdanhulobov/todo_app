import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "../../types";

interface ThemeState {
  currentTheme: Theme;
}

const initialState: ThemeState = {
  currentTheme: (localStorage.getItem("theme") as Theme) || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.currentTheme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
