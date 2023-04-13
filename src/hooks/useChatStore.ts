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
};

const useChatStore = create<ChatStore>((set, get) => ({
  chatRooms: [],
  getChatRooms: async (clientId: number, name: string, chatType?: ChatType) => {
    const { data } = await client.get(`${API}chatgroup/all-group/${clientId}`, {
      name,
      chatType,
    });
    set({ chatRooms: data });
  },
}));

export default useChatStore;
