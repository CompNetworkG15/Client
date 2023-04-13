import React from "react";
import styled from "styled-components";
import { ChatType, ChatRoom } from "@/types";
import useProfileStore from "@/hooks/useProfileStore";
import useChatStore from "@/hooks/useChatStore";
import { Typography } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";

type ChatRoomProps = {
  chatRoom: ChatRoom;
  sendJoin: (chatId: number, cliendId: number) => void;
};

const { Title } = Typography;

const ChatRoomCard: React.FC<ChatRoomProps> = ({ chatRoom, sendJoin }) => {
  const { id, name, image, chatType } = chatRoom;
  const { setCurrentChatRoom } = useChatStore();
  const clientId = useProfileStore().id;

  const handleClick = () => {
    sendJoin(id, clientId as number);
    setCurrentChatRoom(chatRoom);
  };

  return (
    <ChatRoomContainer onClick={handleClick}>
      {chatType === ChatType.DIRECT ? (
        <AccountCircleIcon sx={{ color: "black", justifySelf: "center" }} />
      ) : (
        <PeopleIcon sx={{ color: "black", justifySelf: "center" }} />
      )}
      <Title level={5}>{name}</Title>
    </ChatRoomContainer>
  );
};

const ChatRoomContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  padding: 10px;
  height: 75px;
  align-items: center;
  :hover {
    background-color: white;
  }
  .ant-typography {
    margin: 0;
  }
`;

export default ChatRoomCard;
