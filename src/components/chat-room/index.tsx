import React from "react";
import styled from "styled-components";
import Image from "next/legacy/image";
import { API } from "@/config";
import { Message } from "@/types";
import { Socket } from "socket.io-client";
import useProfileStore from "@/hooks/useProfileStore";

type ChatRoomProps = {
  id: number;
  name: string;
  image?: string;
  chatType: string;
  socket?: Socket;
  messages: Message[];
};

const ChatRoom: React.FC<ChatRoomProps> = ({
  id,
  name,
  image,
  chatType,
  socket,
  messages,
}) => {
  const clientId = useProfileStore().id;

  const handleClick = () => {
    socket?.emit("join", { chatId: id, clientId: clientId });
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

export default ChatRoom;
