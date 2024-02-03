import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Upload, Button, message, Input, Modal } from "antd";
import Papa from "papaparse";
import { delete_contact_thunk, get_all_contacts_thunk, save_contact_thunk } from "../settings-thunk";

const ListContactsTab = () => {
  const dispatch = useDispatch();

  const [selectedContactsObj, setSelectedContactsObj] = useState(null);
  const [showViewContactsModal, setShowViewContactsModal] = useState(false);
  const open_view_contacts_modal = () => {
    setShowViewContactsModal(true);
  };
  const close_view_contacts_modal = () => {
    setSelectedContactsObj(null);
    setShowViewContactsModal(false);
  };

  const get_contacts = async () => {
    await dispatch(get_all_contacts_thunk());
  };

  const loading = useSelector((state) => state.settingsslice.loading);
  const contacts_list_data = useSelector((state) => state.settingsslice.contacts_list_data);

  const view_contacts = async (contact_obj) => {
    setSelectedContactsObj(contact_obj);
    setShowViewContactsModal(true);
  };

  const delete_contacts = async (contact_obj) => {
    setSelectedContactsObj(contact_obj);
    await dispatch(delete_contact_thunk(contact_obj._id));
    get_contacts();
  };

  return (
    <>
      <div>
        <Button onClick={get_contacts} type="primary">
          List Contacts
        </Button>
      </div>
      <div>
        {contacts_list_data.map((contacts_list, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px", margin: "10px", border: "1px solid #c5c2c2", cursor: "pointer" }}>
            <div>
              {i + 1} . {contacts_list.contact_group_name}
            </div>
            <div>{contacts_list.contacts_list.length} contact(s)</div>
            <div>
              <Button type="primary" style={{ margin: "0 10px" }} onClick={() => view_contacts(contacts_list)}>
                View Contacts
              </Button>
              <Button type="primary" danger style={{ margin: "0 10px" }} onClick={() => delete_contacts(contacts_list)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal title={selectedContactsObj?.contact_group_name} open={showViewContactsModal} onOk={close_view_contacts_modal} onCancel={close_view_contacts_modal}>
        <div style={{ fontSize: "16px", fontWeight: "bold", textAlign: "center" }}>{selectedContactsObj ? selectedContactsObj.contacts_list.length : 0} contact(s)</div>
        <div style={{ height: "250px", overflow: "auto" }}>{selectedContactsObj && selectedContactsObj.contacts_list.map((contacts, i) => <div key={i}>{contacts}</div>)}</div>
      </Modal>
    </>
  );
};

const CreateContactTab = () => {
  const dispatch = useDispatch();
  const [contactsGroupName, setContactsGroupName] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);

  const loading = useSelector((state) => state.settingsslice.loading);
  const contacts_save_status = useSelector((state) => state.settingsslice.contacts_save_status);

  const file_on_change = (info) => {
    console.log("info:", info);
    if (info.file.originFileObj) {
      Papa.parse(info.file.originFileObj, {
        header: false,
        skipEmptyLines: true,
        complete: (result) => {
          const all_constacts = result.data ? result.data : [];
          const flattenedArray = all_constacts.flat().filter(Boolean);
          console.log("==>flattenedArray: ", flattenedArray);
          setSelectedContacts(flattenedArray);
          message.success("File selected successfully.");
        },
        error: (error) => {
          console.error("Error:", error);
          message.error("Error parsing CSV file.");
        },
      });
    }
  };

  const save_contacts_group = async () => {
    if (contactsGroupName === undefined || contactsGroupName === null || contactsGroupName.trim() === "") message.error("Please enter contacts group name");
    else if (selectedContacts === undefined || selectedContacts === null || selectedContacts.length <= 0) message.error("Please choose valid contacts");
    else {
      let body = { contact_group_name: contactsGroupName, contacts_list: selectedContacts };
      await dispatch(save_contact_thunk(body));
      setContactsGroupName("");
      setSelectedContacts([]);
      message.info(contacts_save_status);
    }
  };

  return (
    <>
      <div>
        <Upload.Dragger customRequest={() => false} showUploadList={false} accept=".csv" onChange={file_on_change}>
          <p className="ant-upload-drag-icon">Drag & Drop or Click</p>
          <p className="ant-upload-text">Click to Upload</p>
        </Upload.Dragger>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginTop: 16 }}>
            <h3>{selectedContacts.length} Contact(s):</h3>
            <div style={{ height: "150px", overflow: "auto" }}>
              {selectedContacts.map((contact, i) => (
                <div key={i}>{contact}</div>
              ))}
            </div>
          </div>

          <div style={{ width: "50%", padding: "10px", margin: "10px" }}>
            <div>
              Contacts group name
              <Input placeholder="Contacts group name" value={contactsGroupName} onChange={(e) => setContactsGroupName(e.target.value)} />
            </div>
            <div style={{ padding: "10px", margin: "10px" }}>
              <Button type="primary" style={{ float: "right" }} onClick={save_contacts_group}>
                Save contact group
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Contacts = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const tab_items = [
    {
      key: "1",
      label: "List all contacts",
      children: <ListContactsTab />,
    },
    {
      key: "2",
      label: "Create new contact",
      children: <CreateContactTab />,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={tab_items} onChange={onChange} />
    </>
  );
};
export default Contacts;
