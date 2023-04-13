import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/legacy/image";
import { API } from "@/config";
import { ChatType, Message } from "@/types";
import { Socket } from "socket.io-client";
import useProfileStore from "@/hooks/useProfileStore";

const mockMessages: Message[] = [
  {
    id: 1,
    chatId: 0,
    clientId: 1,
    name: "John",
    content: "Hello",
    createdAt: new Date(),
  },
  {
    id: 2,
    chatId: 0,
    clientId: 2,
    name: "John",
    content: "Hello",
    createdAt: new Date(),
  },
  {
    id: 3,
    chatId: 0,
    clientId: 1,
    name: "John",
    content: "Hello",
    createdAt: new Date(),
  },
  {
    id: 4,
    chatId: 0,
    clientId: 1,
    name: "John",
    content: "Hello",
    createdAt: new Date(),
  },
  {
    id: 5,
    chatId: 0,
    clientId: 1,
    name: "John",
    content: "Hello",
    createdAt: new Date(),
  },
  {
    id: 6,
    chatId: 0,
    clientId: 2,
    name: "John",
    content: "Hello",
    createdAt: new Date(),
  },
  {
    id: 7,
    chatId: 0,
    clientId: 2,
    name: "John",
    content:
      "HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello",
    createdAt: new Date(),
  },
  {
    id: 8,
    chatId: 0,
    clientId: 1,
    name: "John",
    content: "Hello",
    createdAt: new Date(),
  },
];

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
      <CenterContainer>
        {/* {chatType == ChatType.DIRECT ? ( */}
        <UserContainer>{name}</UserContainer>
        {/* // ) : (
        //   <UserContainer>{name} (3)</UserContainer>
        // )} */}

        <MessageContainer>
          {/* {mockMessages[mockMessages.length - 1].content.length <= 18
            ? mockMessages[mockMessages.length - 1].content
            : `${mockMessages[mockMessages.length - 1].content.substring(
                0,
                18
              )}.....`} */}
        </MessageContainer>
      </CenterContainer>
      <RightContainer>
        <TimeContainer>
          {/* {mockMessages[mockMessages.length - 1].createdAt
            .toString()
            .substring(15, 21)} */}
        </TimeContainer>
        {/* {1 > 0 ? ( */}
        {/* <NewMessagesCountContainer>{1}</NewMessagesCountContainer> */}
        {/* ) : ( */}
        <NoNewMessagesCountContainer></NoNewMessagesCountContainer>
        {/* )} */}
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

const NewMessagesCountContainer = styled.div`
  border-radius: 50%;
  height: 1.1vw;
  width: 1.1vw;
  background-color: #f96491;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.7vw;
`;

const NoNewMessagesCountContainer = styled.div`
  border-radius: 50%;
  height: 1.5vw;
  width: 1.5vw;
  background-color: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.7vw;
`;

const RightContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: end;
  justify-content: space-around;
  width: 25%;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: start;
  justify-content: space-around;
  width: 50%;
  padding: 0 0.5vw;
`;

const LeftContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 3vw;
  width: 3vw;
`;

const TimeContainer = styled.div`
  color: #cccccc;
  font-size: 0.7vw;
`;

const UserContainer = styled.div`
  font-weight: bold;
  font-size: 1vw;
  color: black;
`;

const MessageContainer = styled.div`
  color: #777777;
  font-size: 0.7vw;
`;

export default ChatRoom;
