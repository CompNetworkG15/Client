import { API, SOCKET_URL } from "@/config";
import { ChatType } from "@/types";
import client from "@/utils/client";
import theme from "@/utils/theme";
import ChatRoomList from "@/views/chat/ChatRoomList";
import ChatWindow from "@/views/chat/ChatWindow";
import { Layout, Typography, message } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import styled from "styled-components";
import SearchInput from "../common/input/SearchInput";

const { Header, Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);
  const [chatName, setChatName] = useState<string>("");
  const [chatType, setChatType] = useState<ChatType>();
  const [chatRooms, setChatRooms] = useState<any[]>([]);

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

  useEffect(() => {
    const getChatRooms = async () => {
      try {
        const chatRooms = await client.get(`${API}chatgroup`, {
          name: chatName,
          chatType: chatType,
        });
        setChatRooms(chatRooms.data);
      } catch (error: any) {
        message.error(error.message);
      }
    };
    getChatRooms();
  }, [chatName, chatType]);

  const send = (message: string) => {
    socket?.emit("message", message);
  };

  const renderSideber = () => {
    return (
      <SidebarContainer>
        <SidebarHeader>
          <SearchInput
            style={StyledInput}
            placeholder="Search for chats"
            onChange={(e: any) => setChatName(e.target.value)}
            onPressEnter={(e: any) => setChatName(e.target.value)}
          />
        </SidebarHeader>
        <ChatRoomList chatRoomList={chatRooms} />
      </SidebarContainer>
    );
  };

  return (
    <ChatContainer>
      <NavBar>
        <ChatCategory>
          <Category
            style={{
              borderBottom:
                chatType === undefined
                  ? `2px solid ${theme.color.gray}`
                  : undefined,
            }}
            onClick={() => setChatType(undefined)}
          >
            All
          </Category>
          <Category
            style={{
              borderBottom:
                chatType === ChatType.DIRECT
                  ? `2px solid ${theme.color.gray}`
                  : undefined,
            }}
            onClick={() => setChatType(ChatType.DIRECT)}
          >
            Directs
          </Category>
          <Category
            style={{
              borderBottom:
                chatType === ChatType.GROUP
                  ? `2px solid ${theme.color.gray}`
                  : undefined,
            }}
            onClick={() => setChatType(ChatType.GROUP)}
          >
            Groups
          </Category>
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
  cursor: pointer;
`;

const ProfileName = styled(Title)``;

const MyContent = styled(Content)`
  height: 100%;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

const SidebarContainer = styled.div`
  width: 100%;
  border: 1px solid white;
  height: 100%;
  border-right: 1px solid ${theme.color.border};
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInput = {
  width: "80%",
};

export default Home;
