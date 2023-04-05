import ChatRoomList from "../views/chat/ChatRoomList";
import theme from "@/utils/theme";
import ChatWindow from "@/views/chat/ChatWindow";
import { Layout, TabsProps, Typography } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

const { Header, Content } = Layout;
const { Title } = Typography;

const chatRooms = [
  {
    user: "Alice",
    messages: ["Hello, Alice!", "Hi, Bob!", "What's up, Charlie?"],
    time: "10:00 AM",
    newMessagesCount: 1,
  },
  {
    user: "Dave",
    messages: ["Hey, Dave!", "Hi, Eve!"],
    time: "21:00 PM",
    newMessagesCount: 0,
  },
  {
    user: "Dave",
    messages: ["Hey, Dave!", "test test"],
    time: "21:00 PM",
    newMessagesCount: 0,
  },
  {
    user: "Dave",
    messages: ["Hey, Dave!", "Hi, Eve!"],
    time: "21:00 PM",
    newMessagesCount: 3,
  },
  {
    user: "Dave",
    messages: ["Hey, Dave!", "Eve!sssjdnjasdnsajasdmkasdmsakssss"],
    time: "21:00 PM",
    newMessagesCount: 0,
  },
  {
    user: "Dave",
    messages: ["Hey, Dave!", "Eve!sssjdnjasdnsajasdmkasdmsakssss"],
    time: "21:00 PM",
    newMessagesCount: 10,
  },
  {
    user: "Dave",
    messages: ["Hey, Dave!", "Eve!sssjdnjasdnsajasdmkasdmsakssss"],
    time: "21:00 PM",
    newMessagesCount: 10,
  },
  {
    user: "Dave",
    messages: ["Hey, Dave!", "Eve!sssjdnjasdnsajasdmkasdmsakssss"],
    time: "21:00 PM",
    newMessagesCount: 10,
  },
  {
    user: "Dave",
    messages: ["Hey, Dave!", "Eve!sssjdnjasdnsajasdmkasdmsakssss"],
    time: "21:00 PM",
    newMessagesCount: 10,
  },
  {
    user: "Dave",
    messages: ["Hey, Dave!", "Eve!sssjdnjasdnsajasdmkasdmsakssss"],
    time: "21:00 PM",
    newMessagesCount: 10,
  },
  {
    user: "Dave",
    messages: ["Hey, Dave!", "Eve!sssjdnjasdnsajasdmkasdmsakssss"],
    time: "21:00 PM",
    newMessagesCount: 10,
  },
];

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

  const send = (message: string) => {
    socket?.emit("message", message);
  };

  const renderSideber = () => {
    return (
      <SidebarContainer>
        <SidebarHeader>
          <SearchContainer>
            <SearchIcon sx={{ fontSize: "1.2vw" }} />
            <StyledInput placeholder="Search for chats" />
          </SearchContainer>
        </SidebarHeader>
        <ChatRoomList chatRoomList={chatRooms} />
      </SidebarContainer>
    );
  };

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
        {renderSideber()}
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
`;

const ProfileName = styled(Title)``;

const MyContent = styled(Content)`
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-flow: row;
`;

const SidebarContainer = styled.div`
  width: 20%;
  border: 1px solid white;
  height: 100vh;
  border-right: 1px solid ${theme.color.border};
`;

const SidebarHeader = styled.div`
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchContainer = styled.div`
  height: 80%;
  width: 80%;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-radius: 6px;
`;

const StyledInput = styled.input`
  height: 100%;
  width: 80%;
  background-color: #fff;
  border: 0;
  outline: none;
  font-size: 1vw;
  ::placeholder {
    font-size: 0.7vw;
  }
`;

export default Home;
