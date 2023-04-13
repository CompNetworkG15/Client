export const ChatType = {
  DIRECT: "DIRECT",
  GROUP: "GROUP",
} as const;

export type ChatType = typeof ChatType[keyof typeof ChatType];

export type ChatMember = {
  id: number;
  image?: string;
  nickname: string;
};

export type ChatRoom = {
  id: number;
  name: string;
  image?: string;
  chatType: ChatType;
  chatMembers: ChatMember[];
  messages: Message[];
};

export type Message = {
  id: number;
  content: string;
  createdAt: Date;
  clientId: number;
  chatId: number;
  nickname: string;
};
