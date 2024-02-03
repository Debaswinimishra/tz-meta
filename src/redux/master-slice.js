import { combineReducers } from "@reduxjs/toolkit";

// Slices
import loginslice from "../pages/login/login-slice";
import templatesslice from "../pages/templates/templates-slice";
import messagingslice from "../pages/messaging/messaging-slice";
import settingsslice from "../pages/settings/settings-slice";

const masterslice = combineReducers({
  loginslice,
  templatesslice,
  messagingslice,
  settingsslice,
});
export default masterslice;
