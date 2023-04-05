import ChatRoomList from "../views/chat/ChatRoomList";
import theme from "@/utils/theme";
import ChatWindow from "@/views/chat/ChatWindow";
import { Layout, TabsProps, Typography } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

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

  return <div>{renderSideber()}</div>;
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
        <ChatWindow name="Tae" messages={messages} send={send} />
      </MyContent>
    </ChatContainer>
  );
};

const SidebarContainer = styled.div`
  width: 20%;
  border: 1px solid white;
  height: 100vh;
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
  background-color: #f6f6f6;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-radius: 6px;
`;

const StyledInput = styled.input`
  height: 100%;
  width: 80%;
  background-color: #f6f6f6;
  border: 0;
  outline: none;
  font-size: 1vw;
`;

export default Home;
