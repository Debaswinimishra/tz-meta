import React, { useEffect } from "react";
import { Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { add_requested_user_thunk, getloginrequestdetails_thunk } from "../settings-thunk";

const LoginRequestUsers = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.settingsslice.loading);
  const login_request_data = useSelector((state) => state.settingsslice.login_request_data);
  const add_requested_user_status = useSelector((state) => state.settingsslice.add_requested_user_status);

  useEffect(() => {
    get_login_request_data();
  }, []);
  const get_login_request_data = async () => {
    await dispatch(getloginrequestdetails_thunk());
  };

  const add_user_button_click = async (user) => {
    await dispatch(add_requested_user_thunk(user));
    await dispatch(getloginrequestdetails_thunk());
    message.info(add_requested_user_status);
  };

  return (
    <>
      <div>
        The user who have attempted login, but failed due to authentication. Admin can allow them for the login credentials.
        <br />
        <br />
        {login_request_data.length} record(s) found.
        <div>
          {loading && <div>Loading data. Please wait ...</div>}
          {!loading &&
            login_request_data.map((requested_user_data) => (
              <div style={{ display: "flex", padding: "10px", margin: "10px", width: "500px", border: "1px solid #d2cece" }}>
                <div>
                  <img src={requested_user_data.picture} alt="user" referrerPolicy="no-referrer" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", padding: "0 10px", margin: "0 10px" }}>
                  <div style={{ fontSize: "20px" }}>{requested_user_data.name}</div>
                  <div>{requested_user_data.email}</div>
                  <div>{requested_user_data.createdon}</div>
                  <Button type="primary" onClick={() => add_user_button_click(requested_user_data)}>
                    Add User
                  </Button>
                </div>
                <div></div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default LoginRequestUsers;
