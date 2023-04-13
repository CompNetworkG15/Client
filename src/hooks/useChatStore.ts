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
  createChatGroup: (name: string) => Promise<void>;
  setCurrentChatRoom: (chatRoom: ChatRoom) => Promise<void>;
  addMessage: (message: Message) => void;
  joinChat: (chatId: number, clientId: number) => Promise<void>;
};

const useChatStore = create<ChatStore>((set, get) => ({
  chatRooms: [],
  messages: [],
  getChatRooms: async (clientId: number, name: string, chatType?: ChatType) => {
    const { currentChatRoom } = get();
    const chatRooms = await client.get(
      `${API}chatgroup/all-group/${clientId}`,
      {
        name,
        chatType,
      }
    );
    if (currentChatRoom) {
      const chatRoom = chatRooms.data.find(
        (chatRoom: ChatRoom) => chatRoom.id === currentChatRoom.id
      );
      console.log("tae", chatRoom);
      set({ currentChatRoom: chatRoom });
    }
    set({ chatRooms: chatRooms.data });
  },
  createChatGroup: async (name: string) => {
    await client.post(`${API}chatgroup`, { name, chatType: ChatType.GROUP });
  },
  setCurrentChatRoom: async (chatRoom: ChatRoom) => {
    const { id } = chatRoom;
    const messages = await client.get(`${API}chat/${id}`);
    set({ currentChatRoom: chatRoom, messages: messages.data });
  },
  addMessage: (message: Message) => {
    const { messages, currentChatRoom } = get();
    if (currentChatRoom && message.chatId === currentChatRoom.id)
      set({ messages: [...messages, message] });
  },
  joinChat: async (chatId: number, clientId: number) => {
    await client.post(`${API}chatgroup/join`, { chatId, clientId });
  },
}));

export default useChatStore;
