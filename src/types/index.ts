export const ChatType = {
  DIRECT: "DIRECT",
  GROUP: "GROUP",
} as const;

export type ChatType = typeof ChatType[keyof typeof ChatType];

export type ChatRoom = {
  id: number;
  name: string;
};

export type Message = {
  id: number;
  content: string;
  createdAt: string;
};
