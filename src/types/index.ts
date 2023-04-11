export type ChatRoom = {
    user: string;
    messages: string[];
    time: string;
    newMessagesCount: number;
  };
export const ChatType = {
  DIRECT: "DIRECT",
  GROUP: "GROUP",
} as const;

export type ChatType = typeof ChatType[keyof typeof ChatType];

export type Message = {};
