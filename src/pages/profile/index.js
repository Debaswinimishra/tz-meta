import React from "react";
import { Button, Col, Layout, Menu, Row, Space } from "antd";
import { profile_menu_items } from "../../route/menus";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../login/login-slice";
const { Content } = Layout;

const Profile = () => {
  const dispatch = useDispatch();
  const picture = localStorage.getItem("picture");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const items = profile_menu_items;
  const menu_item_on_click = (e) => {
    dispatch(logout());
  };

  const LeftMenu = () => (
    <Menu
      // class="button-92"
      // role="button"
      onClick={menu_item_on_click}
      style={{
        width: "100%",
        background: "#f3f2ff",
        borderRadius: "10px",
        borderWidth: "2px",
        borderStyle: "solid",
      }}
      mode="vertical"
      items={items}
    />
  );

  const UserProfile = () => (
    <div style={{ display: "grid", placeContent: "center" }}>
      <div
        style={{
          // background: "linear-gradient(to right, #c2e59c, #64b3f4)",
          height: "100vh",
        }}
      >
        <div>
          <img
            src={picture}
            alt="user"
            referrerPolicy="no-referrer"
            style={{
              width: "180px",
              height: "156px",
              borderRadius: "10px",
              borderRadius: "10px",
              borderWidth: "2px",
              borderRightWidth: "2px solid ",
              borderRightStyle: "solid",
              background: "#f3f2ff",

              borderStyle: "solid",
              placeContent: "center",
              marginLeft: "20%",
            }}
          />
        </div>
        <div style={{ fontSize: "20px" }}>
          <h2>
            <span>Name: {name}</span>
          </h2>
        </div>
        <div>
          {" "}
          <h3>
            <span>Email: {email}</span>
          </h3>
        </div>

        <button class="button-92" role="button">
          Reset password
        </button>
      </div>
    </div>
  );
  return (
    <Space
      direction="vertical"
      className="full-width"
      style={{
        background: "#f3f2ff",
      }}
    >
      <Layout
        // className="bg-white"
        style={{ background: "#f3f2ff" }}
      >
        <Content
          className="bg-white layout-content"
          style={{ background: "#f3f2ff" }}
        >
          <Row gutter={16}>
            <Col
              span={5}
              style={{ borderRight: "2px solid rgb(0 0 0 / 22%) " }}
            >
              <LeftMenu />
            </Col>
            <Col span={18}>
              <UserProfile />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Space>
  );
};

export default Profile;

// import React from "react";
// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
//   Typography,
// } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { logout } from "../login/login-slice";

// const Profile = () => {
//   const dispatch = useDispatch();
//   const picture = localStorage.getItem("picture");
//   const name = localStorage.getItem("name");
//   const email = localStorage.getItem("email");

//   const items = [
//     { key: "reset-password", title: "Reset password" },
//     // Add more menu items if needed
//   ];

//   const menuItemClick = () => {
//     dispatch(logout());
//   };

//   const LeftMenu = () => (
//     <List>
//       {items.map((item) => (
//         <ListItem key={item.key} button onClick={menuItemClick}>
//           <ListItemText primary={item.title} />
//         </ListItem>
//       ))}
//     </List>
//   );

//   const UserProfile = () => (
//     <Container>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Box display="grid" placeContent="center">
//             <Avatar
//               src={picture}
//               alt="user"
//               referrerPolicy="no-referrer"
//               style={{
//                 width: "180px",
//                 height: "156px",
//                 borderRadius: "10px",
//                 borderWidth: "2px",
//                 borderRightWidth: "2px solid",
//                 borderRightStyle: "solid",
//                 background: "#f3f2ff",
//                 borderStyle: "solid",
//                 placeContent: "center",
//                 marginLeft: "20%",
//               }}
//             />
//             <Typography variant="h2" style={{ fontSize: "20px" }}>
//               Name: {name}
//             </Typography>
//             <Typography variant="h3">Email: {email}</Typography>
//             <Button
//               variant="contained"
//               className="button-92"
//               onClick={menuItemClick}
//             >
//               Reset password
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );

//   return (
//     <Container>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={5}>
//           <Paper
//             style={{
//               background: "#f3f2ff",
//               borderRadius: "10px",
//               border: "2px solid rgb(0 0 0 / 22%)",
//             }}
//           >
//             <LeftMenu />
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={7}>
//           <UserProfile />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Profile;
