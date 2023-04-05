import styled from "styled-components";
import Image from "next/legacy/image";

interface ChatRoomProps {
  user: string;
  messages: string[];
  time: string;
  newMessagesCount: number;
}

function ChatRoom({
  user,
  messages,
  time,
  newMessagesCount,
}: ChatRoomProps): JSX.Element {
  return (
    <ChatRoomContainer>
      <LeftContainer>
        <ImageContainer>
          {" "}
          <Image
            src="https://tse3.mm.bing.net/th?id=OIP.1_qlaREyVrKpD1H5uAvAwwHaF7&pid=Api&P=0"
            loader={() =>
              "https://tse3.mm.bing.net/th?id=OIP.1_qlaREyVrKpD1H5uAvAwwHaF7&pid=Api&P=0"
            }
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
        <UserContainer>{user}</UserContainer>
        <MessageContainer>
          {messages[messages.length - 1].length <= 18
            ? messages[messages.length - 1]
            : `${messages[messages.length - 1].substring(0, 18)}.....`}
        </MessageContainer>
      </CenterContainer>
      <RightContainer>
        <TimeContainer>{time}</TimeContainer>
        {newMessagesCount > 0 ? (
          <NewMessagesCountContainer>
            {newMessagesCount}
          </NewMessagesCountContainer>
        ) : (
          <NoNewMessagesCountContainer></NoNewMessagesCountContainer>
        )}
      </RightContainer>
    </ChatRoomContainer>
  );
}

const ChatRoomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  height: 5rem;
  :hover {
    background-color: #f6f6f6;
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
  padding: 0 2vw;
`;

const LeftContainer = styled.div`
  width: 25%;
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
`;

const MessageContainer = styled.div`
  color: #777777;
  font-size: 0.7vw;
`;

export default ChatRoom;
