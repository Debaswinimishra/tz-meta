// import React, { useState } from "react";
// import { useDispatch } from "react-redux";

// import { Menu } from "antd";

// import logo from "./../assets/images/logo.png";
// import { logout } from "../pages/login/login-slice";
// import { nav_menu_items } from "../route/menus";
// import { useNavigate } from "react-router-dom";

// function NavigationBar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const items = nav_menu_items;

//   const [selectedMenu, setSelectedMenu] = useState("/");
//   const menu_item_on_click = (e) => {
//     setSelectedMenu(e.key);
//     navigate(e.key);
//   };

//   const ThinkZoneLogo = () => (
//     <div style={{ display: "flex", alignItems: "center", width: "10%" }}>
//       <img
//         src={logo}
//         alt="ThinkZone"
//         style={{ width: "50px", height: "50px", marginRight: "5px" }}
//       />
//       <span
//         style={{
//           fontSize: "15px",
//           cursor: "pointer",
//           fontFamily: "serif",
//           fontWeight: "bolder",
//         }}
//       >
//         TZ-META
//       </span>
//     </div>
//   );

//   return (
//     <div
//       style={{
//         display: "flex",
//         width: "100%",
//         background: "#f3f2ff",
//         borderBottom: "1px solid #666666",
//         paddingBottom: "2px",
//       }}
//     >
//       <ThinkZoneLogo />
//       <Menu
//         style={{ width: "100%" }}
//         onClick={menu_item_on_click}
//         selectedKeys={[selectedMenu]}
//         mode="horizontal"
//         items={items}
//       />
//     </div>
//   );
// }

// export default NavigationBar;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  Stack,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "./../assets/images/logo.png";
// import { logout } from "../pages/login/login-slice";
import { nav_menu_items } from "../route/menus";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logout } from "../pages/login/login-slice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = nav_menu_items;

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("/");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (path) => {
    setSelectedMenu(path);
    navigate(path);
    setAnchorEl(null);
  };
  // const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menu_item_on_click = (e) => {
    dispatch(logout());
  };

  const ThinkZoneLogo = () => (
    <div style={{ display: "flex", alignItems: "center", width: "10%" }}>
      <img
        src={logo}
        alt="ThinkZone"
        style={{ width: "50px", height: "50px", marginRight: "5px" }}
      />
      <Typography
        variant="h6"
        style={{
          fontSize: "15px",
          cursor: "pointer",
          fontFamily: "serif",
          fontWeight: "bolder",
        }}
      >
        TZ-META
      </Typography>
    </div>
  );

  return (
    <AppBar
      position="static"
      style={{ background: "royalblue", borderBottom: "1px solid #666666" }}
    >
      <Toolbar>
        <div style={{ alignSelf: "flex-start" }}>
          <IconButton edge="start" color="inherit" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {items.map((item) => (
              <MenuItem
                key={item.path}
                selected={selectedMenu === item.path}
                onClick={() => handleMenuItemClick(item.path)}
              >
                {item.title}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <Menu
          id="userprofile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          MenuListProps={{
            "aria-labelledby": "userprofile-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <Stack
              onClick={menu_item_on_click}
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="logo"
              >
                <ExitToAppIcon />
              </IconButton>
              <Typography component="div">Logout</Typography>
            </Stack>
          </MenuItem>
        </Menu>
        <ThinkZoneLogo />
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
