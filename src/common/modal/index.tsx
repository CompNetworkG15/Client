import { Modal } from "antd";
import React from "react";

const CenteredModal = (props: any) => {
  const { children } = props;

  return (
    <Modal {...props} centered={true}>
      {children}
    </Modal>
  );
};

export default CenteredModal;
