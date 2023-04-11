import { API, SOCKET_URL } from "@/config";
import client from "@/utils/client";
import theme from "@/utils/theme";
import ChatList from "@/views/chat/ChatList";
import ChatWindow from "@/views/chat/ChatWindow";
import { Layout, TabsProps, Typography } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import styled from "styled-components";

const { Header, Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL as string);
    setSocket(newSocket);
  }, [setSocket]);

  useEffect(() => {
    const messageListener = (message: string) => {
      setMessages((messages) => [...messages, message]);
    };
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    };
  }, [socket]);

  const send = (message: string) => {
    socket?.emit("message", message);
  };

  const onChooseCategory = async (chatType?: string) => {
    try {
      await client.get(`${API}chatgroup`, { chatType });
    } catch (error) {}
  };

  return (
    <ChatContainer>
      <NavBar>
        <ChatCategory>
          <Category onClick={() => onChooseCategory()}>All</Category>
          <Category onClick={() => onChooseCategory("DIRECT")}>
            Directs
          </Category>
          <Category onClick={() => onChooseCategory("GROUP")}>Groups</Category>
        </ChatCategory>
        <ProfileName level={5}>Tae</ProfileName>
      </NavBar>
      <MyContent>
        <ChatList chatList={[1, 2, 3, 4, 5]} />
        <ChatWindow name="Tae" messages={messages} send={send} />
      </MyContent>
    </ChatContainer>
  );
};

const ChatContainer = styled(Layout)`
  height: 100vh;
  width: 100vw;
  .ant-tabs-nav {
    margin: 0;
  }
  .ant-layout-header {
    background-color: ${theme.color.white};
    padding: 0 5vw 0 2.5vw;
  }
`;

const NavBar = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.color.border};
`;

const ChatCategory = styled.div`
  display: flex;
  flex-flow: row;
  gap: 1vw;
`;

const Category = styled.div`
  width: 50px;
  text-align: center;
  cursor: pointer;
`;

const ProfileName = styled(Title)``;

const MyContent = styled(Content)`
  height: 100%;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

export default Home;
