import { createSlice } from "@reduxjs/toolkit";
import { get_templates_list_thunk, set_default_template_thunk, get_default_template_thunk } from "./templates-thunk";

const initialState = {
  loading: false,
  data: [],
  setdefault_status: 0,
  default_template_data:[]
};

const templatesslice = createSlice({
  name: "templatesslice",
  initialState,
  reducers: {},
  extraReducers: {
    [get_templates_list_thunk.pending]: (state, action) => {
      state.loading = true;
      state.data = [];
    },
    [get_templates_list_thunk.fulfilled]: (state, action) => {
      //console.log("--> get_templates_list_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.data = action.payload.data ? action.payload.data : [];
    },
    [get_templates_list_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.data = [];
    },

    [set_default_template_thunk.pending]: (state, action) => {
      state.loading = true;
      state.setdefault_status = 0;
    },
    [set_default_template_thunk.fulfilled]: (state, action) => {
      console.log("--> set_default_template_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.setdefault_status = action.payload.status;
    },
    [set_default_template_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.setdefault_status = 0;
    },

    [get_default_template_thunk.pending]: (state, action) => {
      state.loading = true;
      state.default_template_data = [];
    },
    [get_default_template_thunk.fulfilled]: (state, action) => {
      console.log("--> set_default_template_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.default_template_data = action.payload.data;
    },
    [get_default_template_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.default_template_data = 0;
    },
  },
});

export default templatesslice.reducer;
