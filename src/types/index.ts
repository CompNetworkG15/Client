export type ChatRoom = {
    id: number;
    name: string;
    image: string;
    chatType: string;
  };
export const ChatType = {
  DIRECT: "DIRECT",
  GROUP: "GROUP",
} as const;

export type ChatType = typeof ChatType[keyof typeof ChatType];

export type Message = {};
