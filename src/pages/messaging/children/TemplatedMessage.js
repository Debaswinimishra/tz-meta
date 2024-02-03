import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Select, message } from "antd";
// Thunk
import { send_templated_message_thunk } from "../messaging-thunk";
import { get_templates_list_thunk } from "../../templates/templates-thunk";
import { get_all_contacts_thunk } from "../../settings/settings-thunk";
import PreviewTemplate from "../../templates/children/PreviewTemplate";

const { Option } = Select;

const TemplatedMessage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // ------------------------ Page load --------------------------
  useEffect(() => {
    get_template_list();
    get_contacts();
  }, []);

  const get_template_list = async () => {
    await dispatch(get_templates_list_thunk());
  };

  const get_contacts = async () => {
    await dispatch(get_all_contacts_thunk());
  };
  // -------------------------------------------------------------

  // ------------------------- contacts --------------------------
  const loading_contact = useSelector((state) => state.settingsslice.loading);
  const contacts_list_data = useSelector((state) => state.settingsslice.contacts_list_data);

  const [selectedContactGroup, setSelectedContactGroup] = useState(null);
  const [selectedContactGroupId, setSelectedContactGroupId] = useState("");

  const contacts_select_on_change = (value) => {
    setSelectedContactGroupId(value);
    const contactobj = contacts_list_data.find((item) => item._id === value);
    setSelectedContactGroup(contactobj);
  };
  // ------------------------------------------------------------

  // ------------------------- Template --------------------------
  const loading_templatelist = useSelector((state) => state.templatesslice.loading);
  const templatesdata = useSelector((state) => state.templatesslice.data);

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const templates_select_on_change = (value) => {
    setSelectedTemplateId(value);
    const templateobj = templatesdata.find((item) => item.id === value);
    setSelectedTemplate(templateobj);
  };
  // -------------------------------------------------------------

  // ---------------------- send message -------------------------
  const loading_sendmessage = useSelector((state) => state.messagingslice.loading);
  const sendmessagedata = useSelector((state) => state.messagingslice.tmp_msg_data);

  const send_button_on_click = () => {
    const selected_template = selectedTemplate ? selectedTemplate : {};
    const contacts_list = selectedContactGroup ? selectedContactGroup.contacts_list : [];

    if (selected_template === undefined || selected_template === null || Object.keys(selected_template).length <= 0) {
      message.error("Select a message template.");
    } else if (contacts_list === undefined || contacts_list === null || contacts_list.length <= 0) {
      message.error("Select a contact group.");
    } else if (selected_template.status !== "APPROVED") {
      message.error("Selected template is not APPROVED.");
    } else {
      let body = { template: selected_template, contacts: contacts_list };
      console.log("==> body: ", body);
      dispatch(send_templated_message_thunk(body));
    }
  };
  // -------------------------------------------------------------

  // -------------------------- reset ----------------------------
  const reset_button_on_click = () => {
    form.resetFields();

    setSelectedTemplate(null);
    setSelectedContactGroup(null);
    setSelectedTemplateId("");
  };
  // -------------------------------------------------------------

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        name="control-hooks"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item name="template" label="Template">
          <Select placeholder="Select a Template" value={selectedTemplateId} onChange={templates_select_on_change} allowClear>
            <Option value="">Select</Option>
            {loading_templatelist && <span>Loading data ...</span>}
            {!loading_templatelist &&
              templatesdata.map((template) => (
                <Option key={template.id} value={template.id}>
                  {template.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name="contact" label="Contacts">
          <Select placeholder="Select contact group" value={selectedContactGroupId} onChange={contacts_select_on_change} allowClear>
            <Option value="">Select</Option>
            {loading_contact && <span>Loading data ...</span>}
            {!loading_contact &&
              contacts_list_data.map((contact) => (
                <Option key={contact._id} value={contact._id}>
                  {contact.contact_group_name}
                </Option>
              ))}
          </Select>

          {/* Contacts preview panel */}
          {/* <div>
          {selectedContactGroup && (
            <div>
              <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                {selectedContactGroup.contact_group_name} | {selectedContactGroup.contacts_list.length} contact(s)
              </div>
              <div style={{ height: "150px", overflow: "auto" }}>
                {selectedContactGroup.contacts_list.map((contact) => (
                  <div key={contact}>{contact}</div>
                ))}
              </div>
            </div>
          )}
        </div> */}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
          <Button type="primary" htmlType="button" onClick={send_button_on_click}>
            Send
          </Button>
          <Button htmlType="button" onClick={reset_button_on_click}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PreviewTemplate template={selectedTemplate} />
      </div>
    </>
  );
};

export default TemplatedMessage;
