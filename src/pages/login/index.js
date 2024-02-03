import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { authenticateUser_thunk } from "./login-thunk";
import { Grid, Paper, Typography, Button, Avatar } from "@mui/material";
import GoogleIcon from "./../../assets/images/google.png";
import WaloginIcon from "./../../assets/images/walogin.png";

function LoginPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loginslice.loading);
  const status = useSelector((state) => state.loginslice.status);
  const message = useSelector((state) => state.loginslice.message);
  const loggedin = useSelector((state) => state.loginslice.loggedin);

  const customLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userdata = await get_userdata(tokenResponse.access_token);
      dispatch(authenticateUser_thunk(userdata));
      if (userdata.verified_email === true) {
        toast.success("Login Success");
      }
    },
  });

  const get_userdata = async (access_token) => {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" +
        access_token,
      { access_token: access_token }
    );
    return response.data;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f2ff",
        overflow: "hidden",
        marginTop: "-18px",
        "@media (max-width: 768px)": {
          marginTop: "-10px",
        },
        "@media (max-width: 576px)": {
          marginTop: "0",
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        style={{
          backgroundColor: "white",
          width: "50%",
          padding: "2%",
          borderRadius: "10px",
          border: "2px solid #8e8e94",
          marginBottom: "2%",
          boxSizing: "border-box",
          "@media (max-width: 968px)": {
            width: "90%",
          },
          "@media (max-width: 976px)": {
            width: "95%",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            borderRight: "2px solid #ccc",
            padding: "0 2%",
            boxSizing: "border-box",
            marginBottom: "2%",
          }}
        >
          <Typography variant="h6" style={{ marginBottom: "2%" }}>
            In May 2022, Meta's CEO, Mark Zuckerberg, stated that WhatsApp Cloud
            API (or WhatsApp Business Cloud API) would be made available to
            enterprises globally to help them benefit from WhatsApp's
            communication and marketing services.
          </Typography>
        </div>
        <div style={{ width: "100%", marginLeft: "10%" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar src={WaloginIcon} alt="Login" />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                Please sign in using your Google account.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={customLogin}
                disabled={loading}
                style={{ marginTop: "10px" }}
              >
                {/* <img
                  src={GoogleIcon}
                  alt="google"
                  width="20"
                  style={{ marginRight: "2%", maxWidth: "100%" }}
                /> */}
                <span style={{ flex: 1, fontWeight: "bold" }}>
                  Sign in with Google
                </span>
              </Button>
            </Grid>
          </Grid>
          <Typography style={{ marginTop: "10px" }}>{message}</Typography>
        </div>
      </Paper>
    </div>
  );
}

export default LoginPage;
