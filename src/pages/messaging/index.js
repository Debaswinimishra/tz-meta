import React, { useState } from "react";
import { Col, Layout, Menu, Row, Space } from "antd";
import { messaging_menu_items } from "../../route/menus";
import { Outlet, useNavigate } from "react-router-dom";
const { Content } = Layout;

const Messaging = () => {
  const navigate = useNavigate();
  const items = messaging_menu_items;
  const [selectedMenu, setSelectedMenu] = useState("");
  const menu_item_on_click = (e) => {
    setSelectedMenu(e.key);
    navigate(e.key);
  };

  const LeftMenu = () => (
    <Menu
      onClick={menu_item_on_click}
      selectedKeys={[selectedMenu]}
      style={{
        width: 256,
      }}
      mode="vertical"
      items={items}
    />
  );
  return (
    <Space direction="vertical" className="full-width">
      <Layout className="bg-white">
        <Content className="bg-white layout-content">
          <Row gutter={16}>
            <Col span={6}>
              <LeftMenu />
            </Col>
            <Col span={18}>
              <Outlet />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Space>
  );
};

export default Messaging;
