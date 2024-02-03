import {
  HomeOutlined,
  WhatsAppOutlined,
  GroupOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";

export const nav_menu_items = [
  // {
  //   label: "Thinkzone Meta",
  // },
  {
    label: "Home",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "Messaging",
    key: "/messaging",
    icon: <WhatsAppOutlined />,
  },
  {
    label: "Templates",
    key: "/templates",
    icon: <GroupOutlined />,
  },
  {
    label: "Settings",
    key: "/settings",
    icon: <SettingOutlined />,
  },
  {
    label: "Profile",
    key: "/profile",
    icon: <UserOutlined />,
  },
];

export const messaging_menu_items = [
  {
    label: "Templated Message",
    key: "/messaging/templated-message",
    icon: <RightCircleOutlined />,
  },
  {
    label: "Text Message",
    key: "/messaging/text-message",
    icon: <RightCircleOutlined />,
  },
  {
    label: "Media Message",
    key: "/messaging/media-message",
    icon: <RightCircleOutlined />,
  },
];

export const templates_menu_items = [
  {
    label: "Templates",
    key: "/templates/list-all-templates",
    icon: <RightCircleOutlined />,
  },
  {
    label: "Create Template",
    key: "/templates/create-template",
    icon: <RightCircleOutlined />,
  },
];

export const settings_menu_items = [
  {
    label: "Local Server",
    key: "/settings/check-local-server",
    icon: <RightCircleOutlined />,
  },
  {
    label: "QR Codes",
    key: "/settings/qr-manager",
    icon: <RightCircleOutlined />,
  },
  {
    label: "Contacts",
    key: "/settings/contacts",
    icon: <RightCircleOutlined />,
  },
  {
    label: "Default Template",
    key: "/settings/default-template",
    icon: <RightCircleOutlined />,
  },
  {
    label: "Users",
    key: "/settings/users",
    icon: <RightCircleOutlined />,
  },
  {
    label: "Login Requests",
    key: "/settings/login-request-users",
    icon: <RightCircleOutlined />,
  },
  {
    label: "Monitor Signal",
    key: "/settings/monitor-signal",
    icon: <RightCircleOutlined />,
  },
];

export const profile_menu_items = [
  {
    label: "Logout",
    key: "/logout",
    icon: <LogoutOutlined />,
  },
];
