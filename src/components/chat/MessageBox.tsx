import { Message } from "@/types";
import { Typography } from "antd";
import React from "react";
import styled from "styled-components";

type MessageBoxProps = {
  key: any;
  message: Message;
  isOwner: boolean;
};

const { Title } = Typography;

const MessageBox: React.FC<MessageBoxProps> = ({ message, isOwner }) => {
  const { content, createdAt, clientId, name } = message;
  return (
    <Box isOwner={isOwner}>
      {!isOwner && <Title level={5}>{name}</Title>}
      <MessageContent>{content}</MessageContent>
    </Box>
  );
};

const Box = styled.div<{ isOwner: boolean }>`
  width: 100%;
  min-height: 50px;
  display: flex;
  flex-flow: ${(p) => (p.isOwner ? "row-reverse" : "row")};
  gap: 10px;
  color: black;
  .ant-typography {
    margin: 0;
  }
`;

const MessageContent = styled.div`
  max-width: 50%;
  background-color: #06c755;
  border-radius: 16px;
  padding: 10px 15px;
  word-wrap: break-word;
`;

export default MessageBox;
