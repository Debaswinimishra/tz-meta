import React, { useEffect } from "react";
import { Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteuser_thunk, getallusers_thunk } from "../settings-thunk";

const Users = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.settingsslice.loading);
  const users_data = useSelector((state) => state.settingsslice.users_data);
  const delete_user_status = useSelector((state) => state.settingsslice.delete_user_status);

  useEffect(() => {
    get_allusers_data();
  }, []);
  const get_allusers_data = async () => {
    await dispatch(getallusers_thunk());
  };
  const delete_user_button_click = async (user) => {
    await dispatch(deleteuser_thunk(user));
    await dispatch(getallusers_thunk());
    message.info(delete_user_status);
  };

  return (
    <>
      <div>
        The list of users who are authenticated. Admin can rights to unauthorize the user(s).
        <br />
        <br />
        {users_data.length} record(s) found.
        <div>
          {loading && <div>Loading data. Please wait ...</div>}
          {!loading &&
            users_data.map((user_data) => (
              <div style={{ display: "flex", padding: "10px", margin: "10px", width: "500px", border: "1px solid #d2cece" }}>
                <div>
                  <img src={user_data.picture} alt="user" referrerPolicy="no-referrer" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", padding: "0 10px", margin: "0 10px" }}>
                  <div style={{ fontSize: "20px" }}>{user_data.name}</div>
                  <div>{user_data.email}</div>
                  <div>{user_data.role}</div>
                  <div>{user_data.createdon}</div>
                  <Button type="primary" danger onClick={() => delete_user_button_click(user_data)}>
                    Unauthorize
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

export default Users;
