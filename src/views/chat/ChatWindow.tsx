import MessageBox from "@/components/chat/MessageBox";
import useProfileStore from "@/hooks/useProfileStore";
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
  const { id } = useProfileStore();
  const [message, setMessage] = React.useState<string>();

  const header = useMemo(
    () => (
      <ChatHeader>
        <Title level={5}>{name}</Title>
      </ChatHeader>
    ),
    [name]
  );

  const mockMessages: Message[] = [
    {
      id: 1,
      chatId: 0,
      clientId: 1,
      name: "John",
      content: "Hello",
      createdAt: new Date(),
    },
    {
      id: 2,
      chatId: 0,
      clientId: 2,
      name: "John",
      content: "Hello",
      createdAt: new Date(),
    },
    {
      id: 3,
      chatId: 0,
      clientId: 1,
      name: "John",
      content: "Hello",
      createdAt: new Date(),
    },
    {
      id: 4,
      chatId: 0,
      clientId: 1,
      name: "John",
      content: "Hello",
      createdAt: new Date(),
    },
    {
      id: 5,
      chatId: 0,
      clientId: 1,
      name: "John",
      content: "Hello",
      createdAt: new Date(),
    },
    {
      id: 6,
      chatId: 0,
      clientId: 2,
      name: "John",
      content: "Hello",
      createdAt: new Date(),
    },
    {
      id: 7,
      chatId: 0,
      clientId: 2,
      name: "John",
      content:
        "HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello",
      createdAt: new Date(),
    },
    {
      id: 8,
      chatId: 0,
      clientId: 1,
      name: "John",
      content: "Hello",
      createdAt: new Date(),
    },
  ];

  const chatContent = useMemo(
    () => (
      <ChatContent>
        {mockMessages.map((message: Message, idx) => (
          <MessageBox
            key={idx}
            message={message}
            isOwner={message.clientId == id}
          />
        ))}
      </ChatContent>
    ),
    [messages, id]
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
  display: flex;
  flex-flow: column;
  padding: 10px;
  overflow-y: scroll;
  gap: 10px;
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
