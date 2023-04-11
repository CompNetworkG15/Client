import React from "react";
import styled from "styled-components";
import Image from "next/legacy/image";
import { API } from "@/config";
import { ChatType } from "@/types";

type ChatRoomProps = {
  name: string;
  image: string;
  chatType: string;
};

const ChatRoom: React.FC<ChatRoomProps> = ({ name, image, chatType }) => {
  return (
    <ChatRoomContainer>
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
        {chatType == ChatType.DIRECT ? (
          <UserContainer>{name}</UserContainer>
        ) : (
          <UserContainer>{name} (3)</UserContainer>
        )}

        <MessageContainer>
          message here
          {/* {messages[messages.length - 1].length <= 18
            ? messages[messages.length - 1]
            : `${messages[messages.length - 1].substring(0, 18)}.....`} */}
        </MessageContainer>
      </CenterContainer>
      <RightContainer>
        <TimeContainer>10:00PM{/*time*/}</TimeContainer>
        {1 > 0 ? (
          <NewMessagesCountContainer>{1}</NewMessagesCountContainer>
        ) : (
          <NoNewMessagesCountContainer></NoNewMessagesCountContainer>
        )}
      </RightContainer>
    </ChatRoomContainer>
  );
};

const ChatRoomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  height: 13vh;
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
