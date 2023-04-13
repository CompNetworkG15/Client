import { ContainedButton } from "@/common/button";
import useChatStore from "@/hooks/useChatStore";
import { Form, Input, Typography, message } from "antd";
import React from "react";
import styled from "styled-components";

type CreateGroupFormProps = {
  onClose: () => void;
};

const { Item } = Form;
const { Title } = Typography;

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ onClose }) => {
  const { createChatGroup } = useChatStore();

  const handleFinish = async (values: { name: string }) => {
    try {
      await createChatGroup(values.name);
      onClose();
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <CreateForm onFinish={handleFinish}>
      <Row>
        <Title level={5}>Group Name</Title>
        <Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your amount",
            },
          ]}
        >
          <Input />
        </Item>
      </Row>
      <ContainedButton text="Create" htmlType="submit" />
    </CreateForm>
  );
};

const CreateForm = styled(Form)`
  display: flex;
  flex-flow: column;
  gap: 10px;
  margin: 20px;
`;

const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  .ant-typography {
    margin: 0;
  }
  .ant-form-item {
    margin: 0;
  }
`;

export default CreateGroupForm;
