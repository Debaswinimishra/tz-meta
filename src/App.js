import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AppRoute from "./route/AppRoute";
import NavigationBar from "./components/NavigationBar";
import { check_login_status } from "./pages/login/login-slice";
import { Space, Layout } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { Header, Content } = Layout;
function App() {
  const dispatch = useDispatch();
  const loggedin = useSelector((state) => state.loginslice.loggedin);
  console.log("loggedin------>", loggedin);
  console.log("--> App | localStorage: ", localStorage);

  useEffect(() => {
    dispatch(check_login_status());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Space
          direction="vertical"
          className="full-width"
          style={{ width: "100%" }}
        >
          <Layout>
            {loggedin ? <NavigationBar /> : <div></div>}

            <Content className="bg-white">
              <AppRoute loggedin={loggedin} />
            </Content>
          </Layout>
        </Space>

        <div className="page_container"></div>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
