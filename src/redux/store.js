import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import masterslice from "./master-slice";

var logger = createLogger();
const store = configureStore({
  reducer: masterslice,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});

export default store;
