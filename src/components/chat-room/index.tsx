import React from "react";
import styled from "styled-components";
import Image from "next/legacy/image";
import { API } from "@/config";
import { ChatRoom } from "@/types";
import useProfileStore from "@/hooks/useProfileStore";
import useChatStore from "@/hooks/useChatStore";

type ChatRoomProps = {
  chatRoom: ChatRoom;
  sendJoin: (chatId: number, cliendId: number) => void;
};

const ChatRoomCard: React.FC<ChatRoomProps> = ({ chatRoom, sendJoin }) => {
  const { id, name, image } = chatRoom;
  const { setCurrentChatRoom } = useChatStore();
  const clientId = useProfileStore().id;

  const handleClick = () => {
    sendJoin(id, clientId as number);
    setCurrentChatRoom(chatRoom);
  };

  return (
    <ChatRoomContainer onClick={handleClick}>
      <LeftContainer>
        <ImageContainer>
          <Image
            src={`${API}${image}`}
            loader={() => `${API}${image}`}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            crossOrigin="anonymous"
            style={{ borderRadius: "50%" }}
          />
        </ImageContainer>
      </LeftContainer>
      <RightContainer>
        <UserContainer>{name}</UserContainer>
      </RightContainer>
    </ChatRoomContainer>
  );
};

const ChatRoomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  height: 11vh;
  :hover {
    background-color: #fff;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: start;
  justify-content: space-around;
  width: 70%;
  padding: 0 0.5vw;
`;

const LeftContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 3vw;
  width: 3vw;
`;

const UserContainer = styled.div`
  font-weight: bold;
  font-size: 1vw;
  color: black;
`;

export default ChatRoomCard;
