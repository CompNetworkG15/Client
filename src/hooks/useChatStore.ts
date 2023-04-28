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
  createChatGroup: (clientId: number, name: string) => Promise<void>;
  setCurrentChatRoom: (chatRoom: ChatRoom) => Promise<void>;
  addMessage: (message: Message) => void;
  joinChat: (chatId: number, clientId: number) => Promise<void>;
  leaveGroup: (chatId: number, clientId: number) => Promise<void>;
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
      const messages = await client.get(`${API}chat/${currentChatRoom.id}`);
      set({ currentChatRoom: chatRoom, messages: messages.data });
    }
    set({ chatRooms: chatRooms.data });
  },
  createChatGroup: async (clientId: number, name: string) => {
    await client.post(`${API}chatgroup/${clientId}`, {
      name,
      chatType: ChatType.GROUP,
    });
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
  leaveGroup: async (chatId: number, clientId: number) => {
    console.log(`chatId: ${chatId}, clientId: ${clientId}`);
    await client.delete(`${API}chatgroup/leave`, {
      data: { chatId, clientId },
    });
  },
}));

export default useChatStore;
