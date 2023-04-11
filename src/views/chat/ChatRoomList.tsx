import { ChatRoom } from "@/types";
import React from "react";
import styled from "styled-components";
import ChatRoomComponent from "@/components/ChatRoom";

type ChatListProps = {
  chatRoomList: ChatRoom[];
};

const ChatRoomList: React.FC<ChatListProps> = ({ chatRoomList }) => {
  return (
    <ChatRoomListContainer>
      {chatRoomList.map((chatRoom, index) => (
        <ChatRoomComponent
          key={index}
          user={chatRoom.user}
          messages={chatRoom.messages}
          time={chatRoom.time}
          newMessagesCount={chatRoom.newMessagesCount}
        />
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
