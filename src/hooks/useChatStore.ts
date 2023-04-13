import { API } from "@/config";
import { ChatRoom, ChatType } from "@/types";
import client from "@/utils/client";
import { create } from "zustand";

type ChatStore = {
  currentChatRoom?: ChatRoom;
  chatRooms: ChatRoom[];
  getChatRooms: (
    clientId: number,
    name: string,
    chatType?: ChatType
  ) => Promise<void>;
  setCurrentChatRoom: (chatRoom: ChatRoom) => void;
};

const useChatStore = create<ChatStore>((set, get) => ({
  chatRooms: [],
  messages: [],
  getChatRooms: async (clientId: number, name: string, chatType?: ChatType) => {
    const { data } = await client.get(`${API}chatgroup/all-group/${clientId}`, {
      name,
      chatType,
    });
    set({ chatRooms: data });
  },
  setCurrentChatRoom: (chatRoom: ChatRoom) => {
    set({ currentChatRoom: chatRoom });
  },
}));

export default useChatStore;
