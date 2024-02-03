import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const send_templated_message_thunk = createAsyncThunk("messaging/send_templated_message", async (body) => {
  return await api
    .post("send_templated_message", body)
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});

export const send_text_message_thunk = createAsyncThunk("messaging/send_text_message", async (body) => {
  return await api
    .post("send_text_message/", body)
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});

export const send_media_message_thunk = createAsyncThunk("messaging/send_media_message", async (body) => {
  return await api
    .post("send_media_message/", body)
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});
