import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";

export const makeStore = () =>
  configureStore({ reducer: { theme: themeReducer } });
