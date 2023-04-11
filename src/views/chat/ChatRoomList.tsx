import { ChatRoom } from "@/types";
import React, { useState } from "react";
import styled from "styled-components";
import ChatRoomComponent from "@/components/ChatRoom";
import { Socket } from "socket.io-client";

type ChatRoomListProps = {
  chatRoomList: ChatRoom[];
  socket?: Socket;
};

const ChatRoomList: React.FC<ChatRoomListProps> = ({
  chatRoomList,
  socket,
}) => {
  return (
    <ChatRoomListContainer>
      {chatRoomList.map((chatRoom, index) => (
        <ChatRoomComponent
          key={index}
          id={chatRoom.id}
          name={chatRoom.name}
          image={chatRoom.image}
          chatType={chatRoom.chatType}
          socket={socket}
        />
      ))}
    </ChatRoomListContainer>
  );
};

const ChatRoomListContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 200px;
  border-right: 1px solid ${theme.color.border};
`;

export default ChatRoomList;
