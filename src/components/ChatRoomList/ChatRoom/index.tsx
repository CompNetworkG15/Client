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
    <div
      className="chat-room"
      style={{ border: "1px solid black", display: "flex" }}
    >
      <div>
        <b>{user}</b>
        <p key={messages.length - 1}>{messages[messages.length - 1]}</p>
      </div>
      <div style={{ justifyContent: "end" }}>
        {time} <br />
        {newMessagesCount}
      </div>
    </div>
  );
}

export default ChatRoom;
