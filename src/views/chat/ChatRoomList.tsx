import React, { useState } from "react";
import styled from "styled-components";
import ChatRoomComponent from "@/components/ChatRoom";
import { Socket } from "socket.io-client";
import theme from "@/utils/theme";
import useChatStore from "@/hooks/useChatStore";

type ChatRoomListProps = {
  socket?: Socket;
};

const ChatRoomList: React.FC<ChatRoomListProps> = ({ socket }) => {
  const { chatRooms } = useChatStore();

  return (
    <ChatRoomListContainer>
      {chatRooms.map((chatRoom, index) => (
        <ChatRoomComponent
          key={index}
          id={chatRoom.id}
          name={chatRoom.name}
          image={chatRoom.image}
          chatType={chatRoom.chatType}
          socket={socket}
          messages={chatRoom.messages}
        />
      ))}
    </ChatRoomListContainer>
  );
};

const ChatRoomListContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  border-right: 1px solid ${theme.color.border};
`;

export default ChatRoomList;
