import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Space, Drawer, Modal, Input } from "antd";
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import { confirmation } from "../../../components/confirm";

import { get_all_qr_codes_thunk, update_one_qr_code_thunk, delete_one_qr_code_thunk, create_qr_code_thunk } from "../settings-thunk";

const QR = () => {
  const dispatch = useDispatch();

  const loading1 = useSelector((state) => state.settingsslice.loading);
  const qr_getall_data = useSelector((state) => state.settingsslice.qr_getall_data);
  const qr_del_data = useSelector((state) => state.settingsslice.qr_del_data);

  // --------------------- Get All QR ----------------------------
  useEffect(() => {
    get_all_qr();
  }, []);

  const get_all_qr = async () => {
    await dispatch(get_all_qr_codes_thunk());
  };
  // -------------------------------------------------------------
  const columns = [
    {
      title: "Pre-filled Message",
      dataIndex: "prefilled_message",
      key: "prefilled_message",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => openQRViewDrawer(record)} type="primary" shape="circle" icon={<EyeOutlined />} />
          {/* <Button onClick={() => update_qr_on_click(record)} type="primary" shape="circle" icon={<EditOutlined />} />
          <Button onClick={() => delete_qr(record)} type="primary" danger shape="circle" icon={<DeleteOutlined />} /> */}
        </Space>
      ),
    },
  ];

  // Create Update QR Modal
  const [showCreateUpdateQRModal, setShowCreateUpdateQRModal] = useState(false);
  const [flag, setFlag] = useState("save");
  const [code, setCode] = useState("");
  const [prefilled_message, setPrefilled_message] = useState("");

  const CreateUpdateQRModalSubmit = async () => {
    if (flag === "save") await save_qr();
    else if (flag === "update") await update_qr();
  };
  const CreateUpdateQRModalCancel = () => {
    setFlag("save");
    setPrefilled_message("");
    setCode("");
    setShowCreateUpdateQRModal(false);
  };

  const create_qr_on_click = () => {
    setFlag("save");
    setSelectedQR(null);
    setCode("");
    setPrefilled_message("");
    setShowCreateUpdateQRModal(true);
  };
  const save_qr = async () => {
    if (prefilled_message === undefined || prefilled_message === null || prefilled_message.trim() === "") {
      console.log("Enter a short message for QR.");
    } else {
      await dispatch(create_qr_code_thunk(prefilled_message));
      get_all_qr();
      CreateUpdateQRModalCancel();
    }
  };

  const update_qr_on_click = () => {
    setFlag("update");
    setCode(selectedQR?.code);
    setPrefilled_message(selectedQR?.prefilled_message);
    setShowCreateUpdateQRModal(true);
    closeQRViewDrawer();
  };
  const update_qr = async () => {
    if (code === undefined || code === null || code.trim() === "") {
      console.log("QR code not found.");
    } else if (prefilled_message === undefined || prefilled_message === null || prefilled_message.trim() === "") {
      console.log("Enter a short message for QR.");
    } else {
      await dispatch(update_one_qr_code_thunk({ code, prefilled_message }));
      get_all_qr();
      CreateUpdateQRModalCancel();
    }
  };

  const delete_qr_on_click = async () => {
    const confirm = await confirmation();
    if (confirm) {
      if (selectedQR.code === undefined || selectedQR.code === null || selectedQR.code.trim() === "") {
        console.log("QR code not found.");
      } else delete_qr();
    }
  };
  const delete_qr = async () => {
    await dispatch(delete_one_qr_code_thunk(selectedQR.code));
    get_all_qr();
    closeQRViewDrawer();
  };

  // QR View Drawer
  const [selectedQR, setSelectedQR] = useState(null);
  const [showQRViewDrawer, setShowQRViewDrawer] = useState(false);
  const openQRViewDrawer = (qr) => {
    setSelectedQR(qr);
    setShowQRViewDrawer(true);
  };
  const closeQRViewDrawer = () => {
    setSelectedQR(null);
    setShowQRViewDrawer(false);
  };

  return (
    <>
      <div>
        {qr_getall_data.length} QR detail(s) found.
        <Button type="primary" onClick={() => create_qr_on_click()} icon={<PlusCircleOutlined />}>
          Create QR Code
        </Button>
      </div>
      <div>
        <Table dataSource={qr_getall_data} columns={columns} />
      </div>

      {/* CreateUpdateQR Modal */}
      <Modal
        title={flag === "save" ? "Create new QR code" : "Update QR code"}
        open={showCreateUpdateQRModal}
        onOk={CreateUpdateQRModalSubmit}
        onCancel={CreateUpdateQRModalCancel}
        footer={[
          <Button key="back" onClick={CreateUpdateQRModalCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading1} onClick={CreateUpdateQRModalSubmit}>
            Submit
          </Button>,
        ]}
      >
        Prefilled Message
        <Input placeholder="Type here the pre filled message" value={prefilled_message} onChange={(e) => setPrefilled_message(e.target.value)} />
      </Modal>

      {/* Drawer */}
      <Drawer
        title={selectedQR?.prefilled_message}
        size="large"
        placement="right"
        open={showQRViewDrawer}
        onClose={closeQRViewDrawer}
        footer={
          <Space style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
            <Button type="primary" onClick={update_qr_on_click} icon={<EditOutlined />}>
              Update
            </Button>
            <Button type="primary" onClick={closeQRViewDrawer} icon={<DownloadOutlined />}>
              Download
            </Button>
            <Button type="primary" onClick={delete_qr_on_click} icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Space>
        }
      >
        <div>
          <div>Image: -- Show here --</div>
          <div>Code: {selectedQR?.code}</div>
          <div>Prefilled Message: {selectedQR?.prefilled_message}</div>
          <div>Deeplink URL: {selectedQR?.deep_link_url}</div>
        </div>
      </Drawer>
    </>
  );
};

export default QR;
