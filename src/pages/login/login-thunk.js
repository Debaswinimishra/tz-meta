import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const authenticateUser_thunk = createAsyncThunk("login/authenticateUser", async (user) => {
  return await api
    .post("authenticateuser" , user)
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});