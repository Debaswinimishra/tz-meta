import { createSlice } from "@reduxjs/toolkit";
import { send_templated_message_thunk, send_text_message_thunk, send_media_message_thunk } from "./messaging-thunk";

const initialState = {
  loading: false,
  tmp_msg_data: [],
  txt_msg_data: [],
  med_msg_data: [],
};

const messagingslice = createSlice({
  name: "messagingslice",
  initialState,
  reducers: {},
  extraReducers: {
    [send_templated_message_thunk.pending]: (state, action) => {
      state.loading = true;
      state.tmp_msg_data = [];
    },
    [send_templated_message_thunk.fulfilled]: (state, action) => {
      console.log("--> send_templated_message_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.tmp_msg_data = action.payload.data ? action.payload.data : [];
    },
    [send_templated_message_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.tmp_msg_data = [];
    },
    [send_text_message_thunk.pending]: (state, action) => {
      state.loading = true;
      state.txt_msg_data = [];
    },
    [send_text_message_thunk.fulfilled]: (state, action) => {
      console.log("--> send_text_message_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.txt_msg_data = action.payload.data ? action.payload.data : [];
    },
    [send_text_message_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.txt_msg_data = [];
    },
    [send_media_message_thunk.pending]: (state, action) => {
      state.loading = true;
      state.tmp_msg_data = [];
    },
    [send_media_message_thunk.fulfilled]: (state, action) => {
      console.log("--> send_media_message_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.tmp_msg_data = action.payload.data ? action.payload.data : [];
    },
    [send_media_message_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.tmp_msg_data = [];
    },
  },
});

export default messagingslice.reducer;
