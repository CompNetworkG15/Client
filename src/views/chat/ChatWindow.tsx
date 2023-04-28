import { ContainedButton, OutlinedButton } from "@/common/button";
import MessageBox from "@/components/chat/MessageBox";
import useChatStore from "@/hooks/useChatStore";
import useProfileStore from "@/hooks/useProfileStore";
import { ChatType, Message } from "@/types";
import { Input, Typography } from "antd";
import React, { useState, useMemo, useRef, useEffect } from "react";
import styled from "styled-components";

type ChatWindowProps = {
  send: (message: string, chatId: number) => void;
  fetchChatRooms: () => Promise<void>;
};

const { Title } = Typography;
const { TextArea } = Input;

const ChatWindow: React.FC<ChatWindowProps> = ({ send, fetchChatRooms }) => {
  const { id } = useProfileStore();
  const { currentChatRoom, messages, joinChat, leaveGroup } = useChatStore();
  const name = currentChatRoom?.name;
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState<string>();
  const [isMember, setMember] = useState<boolean>(true);

  useEffect(() => {
    if (id && currentChatRoom) {
      const allMembers = currentChatRoom.chatMembers.map((member) => member.id);
      if (allMembers.includes(id)) {
        setMember(true);
      } else {
        setMember(false);
      }
    }
  }, [id, currentChatRoom]);

  useEffect(() => {
    // Scroll the div to the bottom
    if (messagesEndRef && messagesEndRef.current)
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);

  const header = useMemo(
    () => (
      <ChatHeader>
        <Title level={5}>{name}</Title>
        {isMember &&
          currentChatRoom?.chatType === ChatType.GROUP && ( // can not leave if it is direct
            <OutlinedButton
              text="Leave group"
              onClick={async () => {
                if (currentChatRoom && id) {
                  await leaveGroup(currentChatRoom!.id, id);
                  await fetchChatRooms(); // re-fetch to update chat room members
                  setMember(false);
                }
              }}
              danger
            />
          )}
      </ChatHeader>
    ),
    [currentChatRoom, fetchChatRooms, id, isMember, leaveGroup, name]
  );

  const chatContent = useMemo(
    () => (
      <ChatContent ref={messagesEndRef}>
        {messages.map((message: Message, idx) => (
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

  const joinGroup = useMemo(
    () => (
      <JoinChatContainer>
        <ContainedButton
          text="Join group"
          onClick={async () => {
            if (currentChatRoom && id) {
              await joinChat(currentChatRoom!.id, id);
              await fetchChatRooms();
              setMember(true);
            }
          }}
        />
      </JoinChatContainer>
    ),
    [currentChatRoom, fetchChatRooms, id, joinChat]
  );

  const chatTextArea = useMemo(() => {
    const handleKeyDown = (e: any) => {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        if (message && message !== "") {
          send(message, currentChatRoom!.id);
          setMessage("");
        }
      }
    };
    return (
      <TextArea
        placeholder="Enter a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoSize={{ minRows: 5, maxRows: 7 }}
        onKeyDown={handleKeyDown}
        disabled={!isMember}
      />
    );
  }, [message, isMember, send, currentChatRoom]);

  if (!currentChatRoom) return <></>;

  return (
    <ChatContainer>
      <Main>
        {header}
        {isMember ? chatContent : joinGroup}
      </Main>
      <Footer>{chatTextArea}</Footer>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  max-height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  overflow-y: scroll;
`;

const ChatHeader = styled.div`
  height: 7.5vh;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  .ant-input-affix-wrapper {
    width: 50%;
  }
  .ant-typography {
    margin-bottom: 0;
  }
`;

const ChatContent = styled.div`
  display: flex;
  flex-flow: column;
  padding: 10px;
  overflow-y: scroll;
  gap: 10px;
`;

const JoinChatContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
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
