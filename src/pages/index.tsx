import { Layout, Typography, message, Input, Space, Image } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import styled from "styled-components";

import { SearchInput } from "@/common/input";
import CenteredModal from "@/common/modal";
import LoginRegisterContent from "@/components/login-register";
import UploadImageModal from "@/components/upload-image-modal";
import { API, SOCKET_URL } from "@/config";
import useProfileStore from "@/hooks/useProfileStore";
import useChatStore from "@/hooks/useChatStore";
import { ChatType, Message } from "@/types";
import theme from "@/utils/theme";
import ChatRoomList from "@/views/chat/ChatRoomList";
import ChatWindow from "@/views/chat/ChatWindow";
import { OutlinedButton } from "@/common/button";
import CreateGroupForm from "@/components/create-group";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const { Header, Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const { getChatRooms, addMessage } = useChatStore();
  const { id, nickname, editNickName, imageUrl } = useProfileStore();
  const [isLogin, setLogin] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket>();
  const [chatName, setChatName] = useState<string>("");
  const [chatType, setChatType] = useState<ChatType>();
  const [editNickNameMode, setEditNickNameMode] = useState<boolean>(false);
  const [creatingGroup, setCreatingGroup] = useState<boolean>(false);
  const [newNickName, setNewNickName] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setLogin(true);
  }, []);

  useEffect(() => {
    const newSocket = io(SOCKET_URL as string);
    setSocket(newSocket);
  }, [setSocket]);

  const newJoinerListener = useCallback(
    async (flag: boolean) => {
      if (flag && id) {
        try {
          await getChatRooms(id, chatName, chatType);
        } catch (error: any) {
          message.error(error.message);
        }
      }
    },
    [chatName, chatType, getChatRooms, id]
  );

  const messageListener = useCallback(
    (message: Message) => {
      addMessage(message);
    },
    [addMessage]
  );

  const changeNickname = async () => {
    setEditNickNameMode(false);
    if (newNickName != "" && id) {
      await editNickName(newNickName, id);
      sendFlag();
    }
  };

  useEffect(() => {
    socket?.on("message", messageListener);
    socket?.on("newJoiner", newJoinerListener);
    return () => {
      socket?.off("message", messageListener);
      socket?.off("newJoiner", newJoinerListener);
    };
  }, [socket, newJoinerListener, messageListener]);

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

  const sendJoin = (chatId: number, clientId: number) => {
    socket?.emit("join", { chatId, clientId });
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
            onPressEnter={() => {
              if (id) getChatRooms(id, chatName, chatType);
            }}
          />
        </SidebarHeader>
        <ChatRoomList sendJoin={sendJoin} />
      </SidebarContainer>
    );
  };

  return (
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
        <ProfileContainer>
          {editNickNameMode ? (
            <Space.Compact style={{ width: "200px" }}>
              <Input
                type="text"
                defaultValue={nickname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewNickName(e.target.value)
                }
                onPressEnter={changeNickname}
                onBlur={changeNickname}
                autoFocus
              ></Input>
            </Space.Compact>
          ) : (
            <Title level={5} onClick={() => setEditNickNameMode(true)}>
              {nickname}
            </Title>
          )}
          <ProfileImageContainer onClick={() => setModalOpen(true)}>
            {imageUrl ? (
              <ProfileImage crossOrigin="anonymous" src={API + imageUrl} />
            ) : (
              <AccountCircleIcon
                sx={{
                  color: "black",
                  justifySelf: "center",
                  fontSize: "30px",
                }}
              />
            )}
          </ProfileImageContainer>
        </ProfileContainer>
      </NavBar>
      <MyContent>
        {renderSideber()}
        <ChatWindow
          send={send}
          fetchChatRooms={async () => {
            try {
              if (id) await getChatRooms(id, chatName, chatType);
            } catch (error: any) {
              message.error(error.message);
            }
          }}
        />
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
        <UploadImageModal
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          clientId={id as number}
        />
      </MyContent>
    </ChatContainer>
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
  .ant-button {
    border-radius: 8px;
  }
`;

const NavBar = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.color.border};
  .ant-typography {
    margin-bottom: 0;
  }
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
  border-bottom: ${(p) => p.isSelected && `3px solid ${theme.color.black}`};
  color: ${(p) => (p.isSelected ? theme.color.black : theme.color.gray)};
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-flow: row;
  gap: 10px;
  align-items: center;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

const ProfileImage = styled.img`
  overflow: hidden;
  object-fit: cover;
  border-radius: 50%;
  height: 100%;
  width: 100%;
`;

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
