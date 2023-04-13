import React from "react";
import styled from "styled-components";
import ChatRoom from "@/components/chat-room";
import useChatStore from "@/hooks/useChatStore";

type ChatRoomListProps = {
  sendJoin: (chatId: number, cliendId: number) => void;
};

const ChatRoomList: React.FC<ChatRoomListProps> = ({ sendJoin }) => {
  const { chatRooms } = useChatStore();

  return (
    <ChatRoomListContainer>
      {chatRooms.map((chatRoom, index) => (
        <ChatRoom key={index} chatRoom={chatRoom} sendJoin={sendJoin} />
      ))}
    </ChatRoomListContainer>
  );
};

const ChatRoomListContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`;

export default ChatRoomList;
