"use client";

import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value:
      typeof window !== "undefined"
        ? localStorage?.getItem("theme") || "dark"
        : "dark",
  },
  reducers: {
    toggleTheme: state => {
      state.value = state.value === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
