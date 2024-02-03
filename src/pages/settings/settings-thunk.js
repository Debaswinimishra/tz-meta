import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// ------------------------- Check local Server --------------------------------
export const check_server_status_thunk = createAsyncThunk("settings/check_server_status", async () => {
  return await api
    .get("test")
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});
// -----------------------------------------------------------------------------

// -------------------------------- Contacts -----------------------------------
export const get_all_contacts_thunk = createAsyncThunk("settings/get_all_contacts", async () => {
  return await api
    .get("get_all_contacts")
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});

export const save_contact_thunk = createAsyncThunk("settings/save_contact", async (body) => {
  return await api
    .post("save_contact", body)
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});

export const delete_contact_thunk = createAsyncThunk("settings/delete_contact", async (id) => {
  return await api
    .delete("delete_contact/"+ id)
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});
// -----------------------------------------------------------------------------

// --------------------------------- Users --------------------------------------
export const getallusers_thunk = createAsyncThunk("settings/getallusers", async () => {
  return await api
    .get("getallusers")
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});

export const getloginrequestdetails_thunk = createAsyncThunk("settings/getloginrequestdetails", async () => {
  return await api
    .get("getloginrequestdetails")
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});

export const add_requested_user_thunk = createAsyncThunk("settings/add_requested_user", async (user) => {
  return await api
    .post("add_requested_user", user)
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});

export const deleteuser_thunk = createAsyncThunk("settings/deleteuser", async (user) => {
  return await api
    .post("deleteuser", user)
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});
// -----------------------------------------------------------------------------

// --------------------------------- QR Code -----------------------------------
export const get_all_qr_codes_thunk = createAsyncThunk("settings/get_all_qr_codes", async () => {
  return await api
    .get("get_all_qr_codes")
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});

export const create_qr_code_thunk = createAsyncThunk("settings/create_qr_code", async (prefilled_message) => {
  return await api
    .get("create_qr_code/" + prefilled_message)
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});

export const update_one_qr_code_thunk = createAsyncThunk("settings/update_one_qr_code", async ({ code, prefilled_message }) => {
  return await api
    .get("update_one_qr_code/" + code + "/" + prefilled_message)
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});

export const delete_one_qr_code_thunk = createAsyncThunk("settings/delete_one_qr_code", async (code) => {
  return await api
    .get("delete_one_qr_code/" + code)
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});
// ----------------------------------------------------------------------------

// ------------------------ Monitor Quality Signal -----------------------------
export const monitor_signal_strength_thunk = createAsyncThunk("settings/monitor_signal_strength", async () => {
  return await api
    .get("monitor_signal_strength")
    .then((response) => response.data)
    .catch((error) => {
      console.error(">>> Axios Error:", error);
      return { status: error.code, message: error.message };
    });
});
// -----------------------------------------------------------------------------
