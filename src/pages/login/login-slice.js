import { createSlice } from "@reduxjs/toolkit";
import { authenticateUser_thunk } from "./login-thunk";

const initialState = {
  loggedin: localStorage.getItem("loggedin") === "yes",
  loading: false,
  status: "",
  message: "",
  data: [],
};

const loginslice = createSlice({
  name: "loginslice",
  initialState,
  reducers: {
    check_login_status(state, action) {
      state.loggedin =
        localStorage.getItem("loggedin") === "yes" ? true : false;
    },
    logout(state, action) {
      localStorage.clear();
      state.loggedin = false;
    },
  },
  extraReducers: {
    [authenticateUser_thunk.pending]: (state, action) => {
      state.data = [];
      state.loggedin = false;
      state.loading = true;
      state.status = action.meta.requestStatus;
      state.message = "loading";
    },
    [authenticateUser_thunk.fulfilled]: (state, action) => {
      //console.log("--> authenticateUser_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.status = action.meta.requestStatus;
      if (action.payload.status === "success") {
        state.data = action.payload.data[0];
        state.loggedin = true;
        state.message = action.payload.message;
        localStorage.setItem("loggedin", "yes");
        localStorage.setItem("email", action.payload.data[0].email);
        localStorage.setItem("family_name", action.payload.data[0].family_name);
        localStorage.setItem("given_name", action.payload.data[0].given_name);
        localStorage.setItem("name", action.payload.data[0].name);
        localStorage.setItem("picture", action.payload.data[0].picture);
      } else {
        state.data = [];
        state.loggedin = false;
        state.message = action.payload.message;
        localStorage.clear();
      }
    },
    [authenticateUser_thunk.rejected]: (state, action) => {
      state.data = [];
      state.loggedin = false;
      state.loading = false;
      state.status = action.meta.requestStatus;
      state.message = action.error.message;
      localStorage.clear();
    },
  },
});

export const { check_login_status, logout } = loginslice.actions;
export default loginslice.reducer;
