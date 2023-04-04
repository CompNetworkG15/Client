import ChatRoom from "./ChatRoom";

interface ChatRoomListProps {
  chatRooms: {
    user: string;
    messages: string[];
    time: string;
    newMessagesCount: number;
  }[];
}

function ChatRoomList({ chatRooms }: ChatRoomListProps): JSX.Element {
  return (
    <div className="chat-room-list">
      {chatRooms.map((chatRoom, index) => (
        <ChatRoom
          key={index}
          user={chatRoom.user}
          messages={chatRoom.messages}
          time={chatRoom.time}
          newMessagesCount={chatRoom.newMessagesCount}
        />
      ))}
    </div>
  );
}

export default ChatRoomList;
