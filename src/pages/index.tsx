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
    const newSocket = io("http://localhost:2000");
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

  const send = (value: string) => {
    socket?.emit("message", value);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `All`,
      children: null,
    },
    {
      key: "2",
      label: `Directs`,
      children: null,
    },
    {
      key: "3",
      label: `Groups`,
      children: null,
    },
  ];

  return (
    <ChatContainer>
      <NavBar>
        <ChatCategory>
          <Category>All</Category>
          <Category>Directs</Category>
          <Category>Groups</Category>
        </ChatCategory>
        <ProfileName level={5}>Tae</ProfileName>
      </NavBar>
      <MyContent>
        <ChatList chatList={[1, 2, 3, 4, 5]} />
        <ChatWindow
          name="Tae"
          messages={[
            1, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3,
            4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2,
            3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5,
          ]}
        />
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
`;

const ProfileName = styled(Title)``;

const MyContent = styled(Content)`
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-flow: row;
`;

export default Home;
