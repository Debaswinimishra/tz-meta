import { Modal } from "antd";

export const confirmation = () => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: "Confirmation",
      content: "Are you sure?",
      onOk: () => resolve(true), 
      onCancel: () => resolve(false), 
    });
  });
};
