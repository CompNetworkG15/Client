import { Chat } from "@/types";
import theme from "@/utils/theme";
import React from "react";
import styled from "styled-components";
import ChatRoom from "@/components/ChatRoom";

type ChatListProps = {
  chatRoomList: Chat[];
};

const ChatRoomList: React.FC<ChatListProps> = ({ chatRoomList }) => {
  return (
    <ChatRoomListContainer>
      {chatRoomList.map((chatRoom, index) => (
        <ChatRoom
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
