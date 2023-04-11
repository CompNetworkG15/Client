export const ChatType = {
  DIRECT: "DIRECT",
  GROUP: "GROUP",
} as const;

export type ChatType = typeof ChatType[keyof typeof ChatType];

export type ChatRoom = {
  id: number;
  name: string;
  image?: string;
  chatType: ChatType;
  members: number[];
  messages: Message[];
};

export type Message = {
  id: number;
  content: string;
  createdAt: Date;
  clientId: number;
  chatId: number;
  name: string;
};
