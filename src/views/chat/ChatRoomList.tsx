import { Chat } from "@/types";
import theme from "@/utils/theme";
import React from "react";
import styled from "styled-components";

type ChatListProps = {
  chatRooms: Chat[];
};

const ChatRoomList: React.FC<ChatListProps> = ({ chatRooms }) => {
  return (
    <ChatListContainer>
      {chatRooms.map((chat: Chat, idx: number) => (
        <div key={idx}>hello</div>
      ))}
    </ChatListContainer>
  );
};

const ChatListContainer = styled.div`
  display: flex;
  flex-flow: column;
  border-right: 1px solid ${theme.color.border};
`;

export default ChatRoomList;
