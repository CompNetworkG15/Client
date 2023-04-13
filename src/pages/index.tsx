import { Layout, Typography, message, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import styled from "styled-components";

import { SearchInput } from "@/common/input";
import CenteredModal from "@/common/modal";
import LoginRegisterContent from "@/components/login-register";
import { SOCKET_URL } from "@/config";
import useProfileStore from "@/hooks/useProfileStore";
import useChatStore from "@/hooks/useChatStore";
import { ChatType, Message } from "@/types";
import theme from "@/utils/theme";
import ChatRoomList from "@/views/chat/ChatRoomList";
import ChatWindow from "@/views/chat/ChatWindow";
import { OutlinedButton } from "@/common/button";
import CreateGroupForm from "@/components/create-group";

const { Header, Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const { getChatRooms, addMessage } = useChatStore();
  const { id, nickname, editNickName } = useProfileStore();
  const [isLogin, setLogin] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket>();
  const [chatName, setChatName] = useState<string>("");
  const [chatType, setChatType] = useState<ChatType>();
  const [editNickNameMode, setEditNickNameMode] = useState<boolean>(false);
  const [creatingGroup, setCreatingGroup] = useState<boolean>(false);
  const [newNickName, setNewNickName] = useState<string>("");

  useEffect(() => {
    setLogin(true);
  }, []);

  useEffect(() => {
    const newSocket = io(SOCKET_URL as string);
    setSocket(newSocket);
  }, [setSocket]);

  useEffect(() => {
    const messageListener = (message: Message) => {
      addMessage(message);
    };
    const newJoinerListener = async (flag: boolean) => {
      if (flag && id) {
        try {
          await getChatRooms(id, chatName, chatType);
        } catch (error: any) {
          message.error(error.message);
        }
      }
    };
    socket?.on("message", messageListener);
    socket?.on("newJoiner", newJoinerListener);
    return () => {
      socket?.off("message", messageListener);
      socket?.off("newJoiner", newJoinerListener);
    };
  }, [id, chatName, chatType, socket, getChatRooms, addMessage]);

  useEffect(() => {
    const fetchChatRooms: any = async () => {
      if (id) {
        try {
          await getChatRooms(id, chatName, chatType);
        } catch (error: any) {
          message.error(error.message);
        }
      }
    };
    fetchChatRooms();
  }, [id, chatName, chatType, getChatRooms]);

  const send = (content: string, chatId: number) => {
    socket?.emit("message", { content, clientId: id, chatId });
  };

  const sendFlag = () => {
    socket?.emit("newJoiner", true);
  };

  const sendJoin = (chatId: number, cliendId: number) => {
    socket?.emit("join", { chatId, cliendId });
  };

  const renderSideber = () => {
    return (
      <SidebarContainer>
        <SidebarHeader>
          <SearchInput
            style={StyledInput}
            placeholder="Search for chats"
            value={chatName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setChatName(e.target.value)
            }
            onPressEnter={() => getChatRooms(id, chatName, chatType)}
          />
        </SidebarHeader>
        <ChatRoomList sendJoin={sendJoin} />
      </SidebarContainer>
    );
  };

  return (
    <>
      <ChatContainer>
        <NavBar>
          <ChatCategory>
            <Category
              isSelected={chatType === undefined}
              onClick={() => setChatType(undefined)}
            >
              All
            </Category>
            <Category
              isSelected={chatType === ChatType.DIRECT}
              onClick={() => setChatType(ChatType.DIRECT)}
            >
              Directs
            </Category>
            <Category
              isSelected={chatType === ChatType.GROUP}
              onClick={() => setChatType(ChatType.GROUP)}
            >
              Groups
            </Category>
            <OutlinedButton
              text="Create Group"
              onClick={() => setCreatingGroup(true)}
            />
          </ChatCategory>
          {editNickNameMode ? (
            <Space.Compact style={{ width: "10%" }}>
              <Input
                type="text"
                defaultValue={nickname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewNickName(e.target.value)
                }
                onPressEnter={() => {
                  setEditNickNameMode(false);
                  if (newNickName != "") editNickName(newNickName, id);
                }}
                autoFocus
              ></Input>
            </Space.Compact>
          ) : (
            <ProfileName level={5} onClick={() => setEditNickNameMode(true)}>
              {nickname}
            </ProfileName>
          )}
        </NavBar>
        <MyContent>
          {renderSideber()}
          <ChatWindow send={send} />
          <CenteredModal open={isLogin} footer={null} closable={false}>
            <LoginRegisterContent sendFlag={sendFlag} setLogin={setLogin} />
          </CenteredModal>
          <CenteredModal
            open={creatingGroup}
            title="Create Group"
            footer={null}
            onCancel={() => setCreatingGroup(false)}
          >
            <CreateGroupForm
              onClose={() => {
                sendFlag();
                setCreatingGroup(false);
              }}
            />
          </CenteredModal>
        </MyContent>
      </ChatContainer>
    </>
  );
};

const ChatContainer = styled(Layout)`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 64px 1fr;
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
  align-items: center;
`;

const Category = styled.div<{ isSelected: boolean }>`
  width: 50px;
  text-align: center;
  cursor: pointer;
  border-bottom: ${(p) => p.isSelected && `2px solid ${theme.color.gray}`};
`;

const ProfileName = styled(Title)``;

const MyContent = styled(Content)`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

const SidebarContainer = styled.div`
  width: 100%;
  border: 1px solid white;
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
