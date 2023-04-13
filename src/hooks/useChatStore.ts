import { API } from "@/config";
import { ChatRoom, ChatType, Message } from "@/types";
import client from "@/utils/client";
import { create } from "zustand";

type ChatStore = {
  currentChatRoom?: ChatRoom;
  messages: Message[];
  chatRooms: ChatRoom[];
  getChatRooms: (
    clientId: number,
    name: string,
    chatType?: ChatType
  ) => Promise<void>;
  setCurrentChatRoom: (chatRoom: ChatRoom) => Promise<void>;
  addMessage: (message: Message) => void;
};

const useChatStore = create<ChatStore>((set, get) => ({
  chatRooms: [],
  messages: [],
  getChatRooms: async (clientId: number, name: string, chatType?: ChatType) => {
    const chatRooms = await client.get(
      `${API}chatgroup/all-group/${clientId}`,
      {
        name,
        chatType,
      }
    );
    set({ chatRooms: chatRooms.data });
  },
  setCurrentChatRoom: async (chatRoom: ChatRoom) => {
    const { id } = chatRoom;
    const messages = await client.get(`${API}chat/${id}`);
    set({ currentChatRoom: chatRoom, messages: messages.data });
  },
  addMessage: (message: Message) => {
    const { messages } = get();
    set({ messages: [...messages, message] });
  },
}));

export default useChatStore;
