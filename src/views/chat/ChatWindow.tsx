import MessageBox from "@/components/chat/MessageBox";
import { Message } from "@/types";
import { Input, Typography } from "antd";
import React, { useMemo } from "react";
import styled from "styled-components";

type ChatWindowProps = {
  name: string;
  messages: Message[];
  send: (message: string) => void;
};

const { Title } = Typography;
const { TextArea } = Input;

const ChatWindow: React.FC<ChatWindowProps> = ({ name, messages, send }) => {
  const [message, setMessage] = React.useState<string>();

  const header = useMemo(
    () => (
      <ChatHeader>
        <Title level={5}>{name}</Title>
      </ChatHeader>
    ),
    [name]
  );

  const chatContent = useMemo(
    () => (
      <ChatContent>
        {messages.map((message: Message, idx) => (
          <MessageBox key={idx} message={message} />
        ))}
      </ChatContent>
    ),
    [messages]
  );

  const chatTextArea = useMemo(
    () => (
      <TextArea
        placeholder="Enter a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoSize={{ minRows: 5, maxRows: 7 }}
        onPressEnter={() => {
          if (message) send(message);
        }}
      />
    ),
    [send, message]
  );

  return (
    <ChatContainer>
      <Main>
        {header}
        {chatContent}
      </Main>
      <Footer>{chatTextArea}</Footer>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

const ChatHeader = styled.div`
  height: 7.5vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  .ant-input-affix-wrapper {
    width: 50%;
  }
`;

const ChatContent = styled.div`
  padding: 10px;
  overflow-y: scroll;
`;

const Main = styled.div`
  display: flex;
  flex-flow: column;
  overflow: hidden;
`;

const Footer = styled.div`
  width: 100%;
  .ant-input {
    border-radius: 0;
  }
`;

export default ChatWindow;
