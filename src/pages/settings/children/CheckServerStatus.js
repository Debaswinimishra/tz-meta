import React from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { check_server_status_thunk } from "../settings-thunk";


const CheckServerStatus = () => {
  const dispatch = useDispatch()
  
  const loading = useSelector((state) => state.settingsslice.loading);
  const loc_svr_status = useSelector((state) => state.settingsslice.loc_svr_status);

  const check_server = async () => {
    await dispatch(check_server_status_thunk());
  };

  return (
    <>
      <div>
        Check the status of the ThinkZone local server health.
        <br />
        If local server is stopped, you will get unknown error alert.
        <br />
        <br />
        <Button type="primary" onClick={check_server}>
          Check Server Status
        </Button>
        <div>
          {loading && <div>Analysing ...</div>}
          {!loading && <div>{ loc_svr_status===200? <div>Server is running.</div> : <div>Server is not running.</div>}</div>}
        </div>
      </div>
    </>
  );
};

export default CheckServerStatus;
