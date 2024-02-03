import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_templates_list_thunk = createAsyncThunk("templates/get_templates_list", async () => {
  return await api
    .get("get_templates_list")
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});

export const set_default_template_thunk = createAsyncThunk("templates/set_default_template", async (template) => {
  return await api
    .post("set_default_template", template)
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});

export const get_default_template_thunk = createAsyncThunk("templates/get_default_template", async (template) => {
  return await api
    .get("get_default_template", template)
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});
