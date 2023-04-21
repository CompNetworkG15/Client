import { Message, MessageType } from "@/types";
import { Typography } from "antd";
import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import theme from "@/utils/theme";

type MessageBoxProps = {
  key: any;
  message: Message;
  isOwner: boolean;
};

const { Paragraph, Text } = Typography;

const MessageBox: React.FC<MessageBoxProps> = ({ message, isOwner }) => {
  const { content, createdAt, nickname, messageType } = message;

  return messageType === MessageType.SYSTEM ? (
    <SystemBox>
      <TextContainer>
        <Text>{dayjs(createdAt).format("HH:mm")}</Text>
        <Paragraph>{content}</Paragraph>
      </TextContainer>
    </SystemBox>
  ) : (
    <Box isOwner={isOwner}>
      {!isOwner && <Paragraph>{nickname}</Paragraph>}
      <MessageContent isOwner={isOwner}>
        <Paragraph>{content}</Paragraph>
      </MessageContent>
      <TimeWrapper>
        <TimeStamp>{dayjs(createdAt).format("HH:mm")}</TimeStamp>
      </TimeWrapper>
    </Box>
  );
};

const SystemBox = styled.div`
  height: fit-content;
  display: flex;
  color: white;
  justify-content: center;
  width: 100%;
  .ant-typography {
    white-space: pre-wrap;
    margin: 0;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-flow: row;
  gap: 10px;
  padding: 5px 10px;
  border-radius: 16px;
  width: fit-content;
  background-color: ${theme.color.lightGray};
`;

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
  background-color: #eAeAeA;
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

const TimeStamp = styled(Text)`
  color: ${theme.color.gray};
  font-size: 12px;
`;

export default MessageBox;
