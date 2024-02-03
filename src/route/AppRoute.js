import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import Home from "../pages/home";
import Login from "../pages/login";

import Messaging from "../pages/messaging";
import TemplatedMessage from "../pages/messaging/children/TemplatedMessage";
import TextMessage from "../pages/messaging/children/TextMessage";
import MediaMessage from "../pages/messaging/children/MediaMessage";

import Templates from "../pages/templates";
import ListTemplates from "../pages/templates/children/ListTemplates";
import CreateTemplate from "../pages/templates/children/CreateTemplate";

import Settings from "../pages/settings";
import CheckServerStatus from "../pages/settings/children/CheckServerStatus";
import MonitorSignal from "../pages/settings/children/MonitorSignal";
import QR from "../pages/settings/children/QR";
import LoginRequestUsers from "../pages/settings/children/LoginRequestUsers";
import Users from "../pages/settings/children/Users";
import Contacts from "../pages/settings/children/Contacts";
import DefaultTemplate from "../pages/settings/children/DefaultTemplate";

import Profile from "../pages/profile";

function AppRoute({ loggedin }) {
  return (
    <Routes>
      {!loggedin && (
        <>
          <Route path="/login" element={<Login />} />
        </>
      )}
      {loggedin && (
        <>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/messaging" element={<Messaging />}>
            <Route path="" element={<TemplatedMessage />} />
            <Route path="templated-message" element={<TemplatedMessage />} />
            <Route path="media-message" element={<MediaMessage />} />
            <Route path="text-message" element={<TextMessage />} />
          </Route>
          <Route path="/templates" element={<Templates />}>
            <Route path="" element={<ListTemplates />} />
            <Route path="list-all-templates" element={<ListTemplates />} />
            <Route path="create-template" element={<CreateTemplate />} />
          </Route>
          <Route path="/settings" element={<Settings />}>
            <Route path="" element={<CheckServerStatus />} />
            <Route path="check-local-server" element={<CheckServerStatus />} />
            <Route path="users" element={<Users />} />
            <Route path="qr-manager" element={<QR />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="default-template" element={<DefaultTemplate />} />
            <Route path="login-request-users" element={<LoginRequestUsers />} />
            <Route path="monitor-signal" element={<MonitorSignal />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
        </>
      )}
      <Route
        path="*"
        element={<Navigate to={loggedin ? "/home" : "/login"} />}
      />
    </Routes>
  );
}

export default AppRoute;
