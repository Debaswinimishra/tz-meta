import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Button, Space, Tag, Drawer } from "antd";
import { ControlOutlined, SettingOutlined } from "@ant-design/icons";

// Thunk
import { get_templates_list_thunk, set_default_template_thunk, get_default_template_thunk } from "./../templates-thunk";
import PreviewTemplate from "./PreviewTemplate";

const ListTemplates = () => {
  const dispatch = useDispatch();

  // Page load
  useEffect(() => {
    get_default_template();
    get_template_list();
  }, []);

  const loading = useSelector((state) => state.templatesslice.loading);
  const templatesdata = useSelector((state) => state.templatesslice.data);
  const default_template_data = useSelector((state) => state.templatesslice.default_template_data);

  const get_template_list = async () => {
    await dispatch(get_templates_list_thunk());
  };
  const get_default_template = async () => {
    await dispatch(get_default_template_thunk());
  };

  //------------------------------

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <Tag color={status.toLowerCase() === "approved" ? "green" : "red"} key={status}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<SettingOutlined />} onClick={() => viewtemplate_on_click(record)}></Button>
        </Space>
      ),
    },
  ];
  //------------------------------

  // Drawer
  const [openTemplateViewDrawer, setOpenTemplateViewDrawer] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const viewtemplate_on_click = (template) => {
    console.log("--> View : ", template);
    setSelectedTemplate(template);
    setOpenTemplateViewDrawer(true);
  };
  const closeTemplateViewDrawer = () => {
    setSelectedTemplate(null);
    setOpenTemplateViewDrawer(false);
  };

  const setdefaulttemplate_button_on_click = async () => {
    console.log("--> View : ", selectedTemplate);
    await dispatch(set_default_template_thunk(selectedTemplate));
    get_default_template();
    setSelectedTemplate(null);
    setOpenTemplateViewDrawer(false);
  };
  //------------------------------

  return (
    <>
      <div>
        The default template you have choosen is: <br />
      </div>
      <div style={{ padding: "10px", margin: "10px", fontSize: "20px", border: "1px solid #b1adad", backgroundColor: "#e8f5e7" }}>{default_template_data.length > 0 ? default_template_data[0].name : ""}</div>
      <div>
        To change the default template, select the template listed below.
        <br />
      </div>
      <br />
      <div>
        Here is the list templates, you have created inside META platform. <br />
        There are {templatesdata.length} record(s) found.
      </div>
      <br />
      <br />
      {loading && <div>Loading data ...</div>}
      {!loading && (
        <div>
          <Table dataSource={templatesdata} columns={columns} />
        </div>
      )}

      {/* Drawer */}
      <Drawer
        title={selectedTemplate ? selectedTemplate.name : ""}
        size="large"
        placement="right"
        open={openTemplateViewDrawer}
        onClose={closeTemplateViewDrawer}
        footer={
          <Space style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
            <Button onClick={closeTemplateViewDrawer}>OK</Button>

            <Button type="primary" onClick={setdefaulttemplate_button_on_click}>
              Set as default
            </Button>
          </Space>
        }
      >
        <div style={{display:"flex", justifyContent:"center"}}>
          <PreviewTemplate template={selectedTemplate} />
        </div>
      </Drawer>
    </>
  );
};

export default ListTemplates;
