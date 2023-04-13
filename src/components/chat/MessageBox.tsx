import { Message } from "@/types";
import { Typography } from "antd";
import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

type MessageBoxProps = {
  key: any;
  message: Message;
  isOwner: boolean;
};

const { Title, Paragraph, Text } = Typography;

const MessageBox: React.FC<MessageBoxProps> = ({ message, isOwner }) => {
  const { content, createdAt, clientId, nickname } = message;
  console.log(nickname, message);
  return (
    <Box isOwner={isOwner}>
      {!isOwner && <Title level={5}>{nickname}</Title>}
      <MessageContent isOwner={isOwner}>
        <Paragraph>{content}</Paragraph>
      </MessageContent>
      <TimeWrapper>
        <Text>{dayjs(createdAt).format("HH:mm")}</Text>
      </TimeWrapper>
    </Box>
  );
};

const Box = styled.div<{ isOwner: boolean }>`
  height: fit-content;
  display: flex;
  flex-flow: ${(p) => (p.isOwner ? "row-reverse" : "row")};
  gap: 10px;
  color: black;
  .ant-typography {
    white-space: pre-wrap;
    margin: 0;
  }
`;

const MessageContent = styled.div<{ isOwner: boolean }>`
  max-width: 50%;
  height: fit-content;
  background-color: #06c755;
  border-radius: 16px;
  border-top-left-radius: ${(p) => (p.isOwner ? "16px" : "0")};
  border-top-right-radius: ${(p) => (p.isOwner ? "0" : "16px")};
  padding: 10px 15px;
  word-wrap: break-word;
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export default MessageBox;
