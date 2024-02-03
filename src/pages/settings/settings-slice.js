import { createSlice } from "@reduxjs/toolkit";
import { check_server_status_thunk, get_all_contacts_thunk, save_contact_thunk, delete_contact_thunk, monitor_signal_strength_thunk, get_all_qr_codes_thunk, create_qr_code_thunk, update_one_qr_code_thunk, delete_one_qr_code_thunk, getallusers_thunk, getloginrequestdetails_thunk, add_requested_user_thunk, deleteuser_thunk } from "./settings-thunk";

const initialState = {
  loading: false,
  users_data: [],
  login_request_data: [],
  qr_getall_data: [],
  qr_save_data: [],
  qr_upd_data: [],
  qr_del_data: [],
  loc_svr_status: 0,
  mtr_sgl_data: [],
  contacts_list_data: [],
  contacts_save_status: 0,
  contacts_delete_status: 0,
  add_requested_user_status: 0,
  delete_user_status: 0,
};

const settingsslice = createSlice({
  name: "settingsslice",
  initialState,
  reducers: {},
  extraReducers: {
    [check_server_status_thunk.pending]: (state, action) => {
      state.loading = true;
      state.loc_svr_status = 0;
    },
    [check_server_status_thunk.fulfilled]: (state, action) => {
      console.log("--> check_server_status_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.loc_svr_status = action.payload.status ? action.payload.status : 0;
    },
    [check_server_status_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.loc_svr_status = 0;
    },

    [get_all_contacts_thunk.pending]: (state, action) => {
      state.loading = true;
      state.contacts_list_data = [];
    },
    [get_all_contacts_thunk.fulfilled]: (state, action) => {
      console.log("--> get_all_contacts_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.contacts_list_data = action.payload.data;
    },
    [get_all_contacts_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.contacts_list_data = [];
    },

    [save_contact_thunk.pending]: (state, action) => {
      state.loading = true;
      state.contacts_save_status = 0;
    },
    [save_contact_thunk.fulfilled]: (state, action) => {
      console.log("--> save_contact_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.contacts_save_status = action.payload.status ? action.payload.status : 0;
    },
    [save_contact_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.contacts_save_status = 0;
    },

    [delete_contact_thunk.pending]: (state, action) => {
      state.loading = true;
      state.contacts_delete_status = 0;
    },
    [delete_contact_thunk.fulfilled]: (state, action) => {
      console.log("--> delete_contact_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.contacts_delete_status = action.payload.status ? action.payload.status : 0;
    },
    [delete_contact_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.contacts_delete_status = 0;
    },

    [getallusers_thunk.pending]: (state, action) => {
      state.loading = true;
      state.users_data = [];
    },
    [getallusers_thunk.fulfilled]: (state, action) => {
      console.log("--> getallusers_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.users_data = action.payload.data;
    },
    [getallusers_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.users_data = [];
    },

    [getloginrequestdetails_thunk.pending]: (state, action) => {
      state.loading = true;
      state.login_request_data = [];
    },
    [getloginrequestdetails_thunk.fulfilled]: (state, action) => {
      console.log("--> getloginrequestdetails_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.login_request_data = action.payload.data;
    },
    [getloginrequestdetails_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.login_request_data = [];
    },

    [add_requested_user_thunk.pending]: (state, action) => {
      state.loading = true;
      state.add_requested_user_status = 0;
    },
    [add_requested_user_thunk.fulfilled]: (state, action) => {
      console.log("--> add_requested_user_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.add_requested_user_status = action.payload.status ? action.payload.status : 0;
    },
    [add_requested_user_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.add_requested_user_status = 0;
    },

    [deleteuser_thunk.pending]: (state, action) => {
      state.loading = true;
      state.delete_user_status = 0;
    },
    [deleteuser_thunk.fulfilled]: (state, action) => {
      console.log("--> deleteuser_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.delete_user_status = action.payload.status ? action.payload.status : 0;
    },
    [deleteuser_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.delete_user_status = 0;
    },

    [get_all_qr_codes_thunk.pending]: (state, action) => {
      state.loading = true;
      state.qr_getall_data = [];
    },
    [get_all_qr_codes_thunk.fulfilled]: (state, action) => {
      console.log("--> get_all_qr_codes_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.qr_getall_data = action.payload.data ? action.payload.data : [];
    },
    [get_all_qr_codes_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.qr_getall_data = [];
    },

    [create_qr_code_thunk.pending]: (state, action) => {
      state.loading = true;
      state.qr_save_data = [];
    },
    [create_qr_code_thunk.fulfilled]: (state, action) => {
      console.log("--> create_qr_code_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.qr_save_data = action.payload.data ? action.payload.data : [];
    },
    [create_qr_code_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.qr_save_data = [];
    },

    [update_one_qr_code_thunk.pending]: (state, action) => {
      state.loading = true;
      state.qr_upd_data = [];
    },
    [update_one_qr_code_thunk.fulfilled]: (state, action) => {
      console.log("--> update_one_qr_code_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.qr_upd_data = action.payload.data ? action.payload.data : [];
    },
    [update_one_qr_code_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.qr_upd_data = [];
    },

    [delete_one_qr_code_thunk.pending]: (state, action) => {
      state.loading = true;
      state.qr_del_data = [];
    },
    [delete_one_qr_code_thunk.fulfilled]: (state, action) => {
      console.log("--> delete_one_qr_code_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.qr_del_data = action.payload.data ? action.payload.data : [];
    },
    [delete_one_qr_code_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.qr_del_data = [];
    },

    [monitor_signal_strength_thunk.pending]: (state, action) => {
      state.loading = true;
      state.mtr_sgl_data = [];
    },
    [monitor_signal_strength_thunk.fulfilled]: (state, action) => {
      console.log("--> monitor_signal_strength_thunk fulfilled | action.payload: ", action.payload);
      state.loading = false;
      state.mtr_sgl_data = action.payload.data ? action.payload.data : [];
    },
    [monitor_signal_strength_thunk.rejected]: (state, action) => {
      state.loading = false;
      state.mtr_sgl_data = [];
    },
  },
});

export default settingsslice.reducer;
