import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChatType, ChatRoom, ChatMember } from "@/types";
import useProfileStore from "@/hooks/useProfileStore";
import useChatStore from "@/hooks/useChatStore";
import { Typography, Image } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import client from "@/utils/client";
import { API } from "@/config";

type ChatRoomProps = {
  chatRoom: ChatRoom;
  sendJoin: (chatId: number, cliendId: number) => void;
};

const { Title } = Typography;

const ChatRoomCard: React.FC<ChatRoomProps> = ({ chatRoom, sendJoin }) => {
  const { id, name, image, chatType, chatMembers } = chatRoom;
  const { setCurrentChatRoom, currentChatRoom } = useChatStore();
  const clientId = useProfileStore().id;
  const [directImage, setDirectImage] = useState<string | undefined>("");

  const handleClick = () => {
    if (!currentChatRoom || currentChatRoom.id !== id) {
      setCurrentChatRoom(chatRoom);
      sendJoin(id, clientId as number);
    }
  };

  useEffect(() => {
    if (chatType === ChatType.DIRECT) {
      console.log(chatMembers);
      const friend = chatMembers.filter(
        (chatMember: ChatMember) => chatMember.id !== clientId
      )[0];
      friend && setDirectImage(friend.image);
    }
  }, [chatMembers, chatType, clientId]);

  return (
    <ChatRoomContainer onClick={handleClick}>
      {chatType === ChatType.DIRECT ? (
        directImage ? (
          <ChatRoomImage crossOrigin="anonymous" src={API + directImage} />
        ) : (
          <AccountCircleIcon
            sx={{ color: "black", justifySelf: "center", fontSize: "55px" }}
          />
        )
      ) : image ? (
        <ChatRoomImage crossOrigin="anonymous" src={API + image} />
      ) : (
        <PeopleIcon
          sx={{ color: "black", justifySelf: "center", fontSize: "55px" }}
        />
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
  cursor: pointer;
  :hover {
    background-color: white;
  }
  .ant-typography {
    margin: 0;
  }
`;

const ChatRoomImage = styled.img`
  object-fit: cover;
  width: 55px !important;
  height: 55px;
  border-radius: 50%;
  margin: 0 auto;
`;

export default ChatRoomCard;
